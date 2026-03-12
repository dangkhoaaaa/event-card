import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Guest, GuestDocument } from './schemas/guest.schema';
import { CreateGuestDto, CreateBulkGuestsDto } from './dto/create-guest.dto';
import { UpdateGuestDto } from './dto/update-guest.dto';
import { CardsService } from '../cards/cards.service';

@Injectable()
export class GuestsService {
  constructor(
    @InjectModel(Guest.name) private guestModel: Model<GuestDocument>,
    private cardsService: CardsService,
  ) {}

  async create(createGuestDto: CreateGuestDto): Promise<Guest> {
    const baseName = createGuestDto.name.trim();
    let nameToUse = baseName;
    let attempt = 0;

    // Nếu trong DB vẫn còn unique index (cardId + name), thêm zero-width space
    // để tên hiển thị giống nhau nhưng giá trị khác nhau → lưu được nhiều bản ghi trùng tên.
    // Khi drop index sau này thì cơ chế này vẫn hoạt động bình thường.
    // eslint-disable-next-line no-constant-condition
    while (true) {
      try {
        const guest = new this.guestModel({
          ...createGuestDto,
          name: nameToUse,
          cardId: new Types.ObjectId(createGuestDto.cardId),
        });
        return await guest.save();
      } catch (error: any) {
        if (error && error.code === 11000) {
          attempt += 1;
          nameToUse = baseName + '\u200b'.repeat(attempt);
          continue;
        }
        throw error;
      }
    }
  }

  async createBulk(createBulkGuestsDto: CreateBulkGuestsDto): Promise<Guest[]> {
    // Verify card exists
    await this.cardsService.findOne(createBulkGuestsDto.cardId);

    const cardId = new Types.ObjectId(createBulkGuestsDto.cardId);

    const nameCounts: Record<string, number> = {};

    const guestsToCreate = createBulkGuestsDto.names.map((rawName) => {
      const baseName = rawName.trim();
      const count = (nameCounts[baseName] ?? 0) + 1;
      nameCounts[baseName] = count;
      const nameWithSuffix =
        count === 1 ? baseName : baseName + '\u200b'.repeat(count - 1);

      return {
        cardId,
        name: nameWithSuffix,
        email: createBulkGuestsDto.email,
        wish: createBulkGuestsDto.wish,
        isJoining: createBulkGuestsDto.isJoining,
      };
    });

    return this.guestModel.insertMany(guestsToCreate, {
      ordered: false,
    });
  }

  async findAll(cardId: string): Promise<Guest[]> {
    return this.guestModel
      .find({ cardId: new Types.ObjectId(cardId) })
      .sort({ createdAt: -1 })
      .exec();
  }

  async findOne(id: string): Promise<Guest> {
    const guest = await this.guestModel.findById(id).exec();
    if (!guest) {
      throw new NotFoundException(`Guest with ID ${id} not found`);
    }
    return guest;
  }

  async findByCardAndName(
    cardId: string,
    name: string,
  ): Promise<GuestDocument | null> {
    return this.guestModel
      .findOne({
        cardId: new Types.ObjectId(cardId),
        name: name.trim(),
      })
      .exec();
  }

  async update(id: string, updateGuestDto: UpdateGuestDto): Promise<Guest> {
    if (updateGuestDto.hasViewed && !updateGuestDto.viewedAt) {
      updateGuestDto['viewedAt'] = new Date();
    }

    const guest = await this.guestModel
      .findByIdAndUpdate(id, updateGuestDto, { new: true })
      .exec();
    if (!guest) {
      throw new NotFoundException(`Guest with ID ${id} not found`);
    }
    return guest;
  }

  async markAsViewed(cardId: string, name: string): Promise<GuestDocument> {
    const guest = await this.findByCardAndName(cardId, name);
    if (!guest) {
      throw new NotFoundException(
        `Guest with name "${name}" not found for this card`,
      );
    }

    if (!guest.hasViewed) {
      guest.hasViewed = true;
      guest.viewedAt = new Date();
      await guest.save();
    }

    return guest;
  }

  async remove(id: string): Promise<void> {
    const result = await this.guestModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Guest with ID ${id} not found`);
    }
  }

  async removeByCardId(cardId: string): Promise<void> {
    await this.guestModel.deleteMany({ cardId: new Types.ObjectId(cardId) }).exec();
  }

  async getStatistics(cardId: string): Promise<{
    total: number;
    viewed: number;
    responded: number;
    attending: number;
    notAttending: number;
    maybe: number;
    joining: number;
    notJoining: number;
  }> {
    const guests = await this.findAll(cardId);
    return {
      total: guests.length,
      viewed: guests.filter((g) => g.hasViewed).length,
      responded: guests.filter((g) => g.hasResponded).length,
      attending: guests.filter((g) => g.response === 'attending').length,
      notAttending: guests.filter((g) => g.response === 'not_attending').length,
      maybe: guests.filter((g) => g.response === 'maybe').length,
      joining: guests.filter((g) => g.isJoining).length,
      notJoining: guests.filter((g) => !g.isJoining).length,
    };
  }
}




