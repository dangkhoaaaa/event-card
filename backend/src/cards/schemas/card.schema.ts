import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Template } from '../../templates/schemas/template.schema';

export type CardDocument = Card & Document;

@Schema({ timestamps: true })
export class Card {
  @Prop({ required: true, type: Types.ObjectId, ref: 'Template' })
  templateId: Types.ObjectId;

  @Prop({ required: true, type: Types.ObjectId, ref: 'User' })
  userId: Types.ObjectId;

  @Prop({ required: true })
  title: string;

  @Prop({ type: Object, required: true })
  content: {
    [key: string]: string | { url: string; publicId?: string };
  };

  @Prop({ required: true })
  hostName: string;

  @Prop({ default: false })
  isPublished: boolean;

  @Prop({ default: 0 })
  viewCount: number;

  @Prop()
  slug: string;
}

export const CardSchema = SchemaFactory.createForClass(Card);
CardSchema.index({ slug: 1 }, { unique: true });
CardSchema.index({ templateId: 1 });
CardSchema.index({ userId: 1 });

