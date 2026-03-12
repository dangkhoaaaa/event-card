import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Card } from '../../cards/schemas/card.schema';

export type GuestDocument = Guest & Document;

@Schema({ timestamps: true })
export class Guest {
  @Prop({ required: true, type: Types.ObjectId, ref: 'Card' })
  cardId: Types.ObjectId;

  @Prop({ required: true })
  name: string;

  @Prop()
  email?: string;

  @Prop({ default: false })
  hasViewed: boolean;

  @Prop()
  viewedAt?: Date;

  @Prop({ default: false })
  hasResponded: boolean;

  @Prop()
  response?: 'attending' | 'not_attending' | 'maybe';

  @Prop()
  message?: string;

  @Prop()
  wish?: string;

  @Prop({ default: false })
  isJoining?: boolean;
}

export const GuestSchema = SchemaFactory.createForClass(Guest);
GuestSchema.index({ cardId: 1 });





