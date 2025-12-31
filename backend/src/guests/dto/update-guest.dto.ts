import {
  IsOptional,
  IsString,
  IsBoolean,
  IsEnum,
  IsDateString,
} from 'class-validator';

export class UpdateGuestDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  email?: string;

  @IsOptional()
  @IsBoolean()
  hasViewed?: boolean;

  @IsOptional()
  @IsDateString()
  viewedAt?: Date;

  @IsOptional()
  @IsBoolean()
  hasResponded?: boolean;

  @IsOptional()
  @IsEnum(['attending', 'not_attending', 'maybe'])
  response?: 'attending' | 'not_attending' | 'maybe';

  @IsOptional()
  @IsString()
  message?: string;
}



