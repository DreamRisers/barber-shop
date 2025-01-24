import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/createUser.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const userFound = await this.usersRepository.findOne({
      where: { username: createUserDto.username },
      select: ['username', 'userId', 'role', 'profileImg'],
    });

    if (userFound) {
      throw new ConflictException(
        `El usuario ${createUserDto.username} ya existe.`,
      );
    }

    const user = this.usersRepository.create(createUserDto);

    await this.usersRepository.save(user);

    return user;
  }
}
