import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Template, TemplateDocument } from './schemas/template.schema';
import { CreateTemplateDto } from './dto/create-template.dto';
import { CardType } from './schemas/template.schema';

@Injectable()
export class TemplatesService {
  constructor(
    @InjectModel(Template.name) private templateModel: Model<TemplateDocument>,
  ) {}

  async create(createTemplateDto: CreateTemplateDto): Promise<Template> {
    const template = new this.templateModel(createTemplateDto);
    return template.save();
  }

  async findAll(type?: CardType): Promise<Template[]> {
    const query = type ? { type, isActive: true } : { isActive: true };
    return this.templateModel.find(query).sort({ createdAt: -1 }).exec();
  }

  async findOne(id: string): Promise<Template> {
    // Check if id is a valid ObjectId
    const isObjectId = /^[0-9a-fA-F]{24}$/.test(id);
    
    let template;
    if (isObjectId) {
      template = await this.templateModel.findById(id).exec();
    } else {
      // If not ObjectId, try to find by name
      template = await this.templateModel.findOne({ name: id }).exec();
    }
    
    if (!template) {
      throw new NotFoundException(`Template with ID ${id} not found`);
    }
    return template;
  }

  async incrementUsage(id: string): Promise<void> {
    await this.templateModel.findByIdAndUpdate(id, { $inc: { usageCount: 1 } });
  }

  async findOrCreateByName(name: string, type: CardType = CardType.WEDDING): Promise<Template> {
    let template = await this.templateModel.findOne({ name }).exec();
    
    if (!template) {
      // Create a minimal template record for frontend-rendered templates
      template = new this.templateModel({
        name,
        type,
        thumbnail: 'https://via.placeholder.com/400x600?text=' + encodeURIComponent(name),
        design: {
          backgroundColor: '#FFFFFF',
          textStyles: {},
          imagePlaceholders: [],
        },
        isActive: true,
        usageCount: 0,
      });
      await template.save();
    }
    
    return template;
  }

  async findByName(name: string): Promise<Template | null> {
    return this.templateModel.findOne({ name }).exec();
  }
}

