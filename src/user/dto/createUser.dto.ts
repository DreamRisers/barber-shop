import { IsEnum, IsString } from 'class-validator';
import { Role } from '../entities/user.entity';

export class CreateUserDto {
  @IsString()
  username: string;

  @IsString()
  password: string;

  @IsEnum(Role)
  role: Role;

  @IsString()
  profileImg: string;
}
