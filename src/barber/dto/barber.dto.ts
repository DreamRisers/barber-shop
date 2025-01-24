import { PartialType } from '@nestjs/mapped-types';
import { IsString } from 'class-validator';

export class CreateBarberDto {
  @IsString()
  name: string;

  @IsString()
  experience: string;

  @IsString()
  services: string;

  @IsString()
  profileImg: string;
}

export class UpdateBarberDto extends PartialType(CreateBarberDto) {}
