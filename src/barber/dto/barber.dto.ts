import { PartialType } from '@nestjs/mapped-types';

export class CreateBarberDto {
  name: string;
  experience: string;
  services: string;
  profileImg: string;
}

export class UpdateBarberDto extends PartialType(CreateBarberDto) {}
