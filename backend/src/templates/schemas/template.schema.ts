import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TemplateDocument = Template & Document;

export enum CardType {
  WEDDING = 'wedding',
  BIRTHDAY = 'birthday',
  ANNIVERSARY = 'anniversary',
  BABY_SHOWER = 'baby_shower',
  OTHER = 'other',
}

@Schema({ timestamps: true })
export class Template {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, enum: CardType })
  type: CardType;

  @Prop({ required: true })
  thumbnail: string;

  @Prop({ type: Object, required: true })
  design: {
    backgroundImage?: string;
    backgroundColor?: string;
    textStyles: {
      [key: string]: {
        fontFamily: string;
        fontSize: number;
        color: string;
        fontWeight: string;
        position: { x: number; y: number };
      };
    };
    imagePlaceholders: Array<{
      id: string;
      position: { x: number; y: number };
      size: { width: number; height: number };
    }>;
  };

  @Prop({ default: true })
  isActive: boolean;

  @Prop({ default: 0 })
  usageCount: number;
}

export const TemplateSchema = SchemaFactory.createForClass(Template);



