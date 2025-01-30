import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role, User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto, LoginUserDTO } from './dto/createUser.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) { }

  async login(userLogin: LoginUserDTO) {
    const user = await this.usersRepository.findOne({ where: { username: userLogin.username } });
    if (!user) throw new NotFoundException('Usuario o contraseña incorrectos');

    const isPasswordValid = await bcrypt.compare(userLogin.password, user.password);
    if (!isPasswordValid) throw new NotFoundException('Usuario o contraseña incorrectos');

    return user;
  }

  async create(userData: CreateUserDto): Promise<User> {
    const userFound = await this.usersRepository.findOne({
      where: { username: userData.username },
      select: ['username'],
    });

    if (userFound) throw new ConflictException(`El usuario ${userData.username} ya existe.`);

    const hashedPassword = await bcrypt.hash(userData.password, 10);
    userData.password = hashedPassword;

    const user = this.usersRepository.create(userData);
    await this.usersRepository.save(user);

    return user;
  }

  async seeder() {
    const adminUser = process.env.ADMIN_NAME ? process.env.ADMIN_NAME : 'admin';
    const adminPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD ? process.env.ADMIN_PASSWORD : '1234', 10);

    const userFound = await this.usersRepository.findOne({ where: { username: adminUser } });
    
    if (!userFound) {
      const createUser: CreateUserDto = {
        username: adminUser,
        password: adminPassword,
        role: Role.ADMIN,
      };

      const user = this.usersRepository.create(createUser);
      await this.usersRepository.save(user);
    }

  }
}
