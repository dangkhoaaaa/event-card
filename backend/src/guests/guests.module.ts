import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GuestsController } from './guests.controller';
import { GuestsService } from './guests.service';
import { Guest, GuestSchema } from './schemas/guest.schema';
import { CardsModule } from '../cards/cards.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Guest.name, schema: GuestSchema }]),
    CardsModule,
  ],
  controllers: [GuestsController],
  providers: [GuestsService],
  exports: [GuestsService],
})
export class GuestsModule {}



