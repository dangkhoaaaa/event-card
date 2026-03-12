import { IsString, IsEmail, IsOptional, IsMongoId, IsArray, IsBoolean } from 'class-validator';

export class CreateGuestDto {
  @IsMongoId()
  cardId: string;

  @IsString()
  name: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  wish?: string;

  @IsOptional()
  @IsBoolean()
  isJoining?: boolean;
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

  @IsOptional()
  @IsString()
  wish?: string;

  @IsOptional()
  @IsBoolean()
  isJoining?: boolean;
}




