import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Card, CardDocument } from './schemas/card.schema';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { TemplatesService } from '../templates/templates.service';

@Injectable()
export class CardsService {
  constructor(
    @InjectModel(Card.name) private cardModel: Model<CardDocument>,
    private templatesService: TemplatesService,
  ) {}

  async create(createCardDto: CreateCardDto, userId: string): Promise<Card> {
    // Verify template exists or create if it's a frontend template
    let templateId = createCardDto.templateId;
    
    // Check if templateId is a name like "template2" (not a MongoDB ObjectId)
    const isObjectId = /^[0-9a-fA-F]{24}$/.test(templateId);
    
    if (!isObjectId) {
      // Not a MongoDB ObjectId, treat as template name
      const templateName = templateId.charAt(0).toUpperCase() + templateId.slice(1).replace(/([0-9])/, ' $1');
      const template = await this.templatesService.findOrCreateByName(templateName);
      templateId = (template as any)._id.toString();
    } else {
      // It's a valid ObjectId, verify template exists
      try {
        await this.templatesService.findOne(templateId);
      } catch (error) {
        // If template not found, try to find or create by name
        throw error;
      }
    }

    // Generate unique slug
    const slug = await this.generateUniqueSlug(createCardDto.title);

    const card = new this.cardModel({
      ...createCardDto,
      templateId: new Types.ObjectId(templateId),
      userId: new Types.ObjectId(userId),
      slug,
    });

    const savedCard = await card.save();

    // Increment template usage
    await this.templatesService.incrementUsage(templateId);

    return savedCard;
  }

  async findAll(userId?: string, hostName?: string): Promise<Card[]> {
    const query: any = {};
    if (userId) {
      query.userId = new Types.ObjectId(userId);
    }
    if (hostName) {
      query.hostName = hostName;
    }
    return this.cardModel.find(query).populate('templateId').sort({ createdAt: -1 }).exec();
  }

  async findOne(id: string): Promise<Card> {
    const card = await this.cardModel.findById(id).populate('templateId').populate('userId').exec();
    if (!card) {
      throw new NotFoundException(`Card with ID ${id} not found`);
    }
    return card;
  }

  async findBySlug(slug: string): Promise<Card> {
    const card = await this.cardModel
      .findOne({ slug })
      .populate('templateId')
      .exec();
    if (!card) {
      throw new NotFoundException(`Card with slug ${slug} not found`);
    }
    return card;
  }

  async update(id: string, updateCardDto: UpdateCardDto): Promise<Card> {
    const card = await this.cardModel
      .findByIdAndUpdate(id, updateCardDto, { new: true })
      .populate('templateId')
      .exec();
    if (!card) {
      throw new NotFoundException(`Card with ID ${id} not found`);
    }
    return card;
  }

  async remove(id: string): Promise<void> {
    const result = await this.cardModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Card with ID ${id} not found`);
    }
  }

  async incrementViewCount(slug: string): Promise<void> {
    await this.cardModel.findOneAndUpdate(
      { slug },
      { $inc: { viewCount: 1 } },
    );
  }

  private async generateUniqueSlug(title: string): Promise<string> {
    const baseSlug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');

    let slug = baseSlug;
    let counter = 1;

    while (await this.cardModel.findOne({ slug }).exec()) {
      slug = `${baseSlug}-${counter}`;
      counter++;
    }

    return slug;
  }
}

