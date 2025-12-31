import { PartialType } from '@nestjs/mapped-types';
import { CreateCardDto } from './create-card.dto';
import { IsOptional, IsObject, IsString, IsBoolean } from 'class-validator';

export class UpdateCardDto extends PartialType(CreateCardDto) {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsObject()
  content?: {
    [key: string]: string | { url: string; publicId?: string };
  };

  @IsOptional()
  @IsBoolean()
  isPublished?: boolean;
}



