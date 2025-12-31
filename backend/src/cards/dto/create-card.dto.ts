import {
  IsString,
  IsObject,
  IsOptional,
  IsBoolean,
  IsMongoId,
} from 'class-validator';

export class CreateCardDto {
  @IsMongoId()
  templateId: string;

  @IsString()
  title: string;

  @IsObject()
  content: {
    [key: string]: string | { url: string; publicId?: string };
  };

  @IsString()
  hostName: string;

  @IsOptional()
  @IsBoolean()
  isPublished?: boolean;
}



