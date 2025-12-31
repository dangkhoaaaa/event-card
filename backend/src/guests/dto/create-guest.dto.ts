import { IsString, IsEmail, IsOptional, IsMongoId, IsArray } from 'class-validator';

export class CreateGuestDto {
  @IsMongoId()
  cardId: string;

  @IsString()
  name: string;

  @IsOptional()
  @IsEmail()
  email?: string;
}

export class CreateBulkGuestsDto {
  @IsMongoId()
  cardId: string;

  @IsArray()
  @IsString({ each: true })
  names: string[];

  @IsOptional()
  @IsEmail()
  email?: string;
}



