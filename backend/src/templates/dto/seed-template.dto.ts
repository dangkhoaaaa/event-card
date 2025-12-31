import { IsString, IsEnum, IsObject, IsOptional, IsBoolean } from 'class-validator';
import { CardType } from '../schemas/template.schema';

export class SeedTemplateDto {
  @IsString()
  name: string;

  @IsEnum(CardType)
  type: CardType;

  @IsString()
  thumbnail: string;

  @IsObject()
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

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}



