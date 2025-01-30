import { ConflictException, Injectable } from '@nestjs/common';
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

    const hashedPassword = bcrypt.hashSync(userLogin.password, 10);
    userLogin.password = hashedPassword;

    if (!user || user.password !== userLogin.password) throw new ConflictException('Usuario o contraseña incorrectos');

    return user;
  }

  async create(userData: CreateUserDto): Promise<User> {
    const userFound = await this.usersRepository.findOne({
      where: { username: userData.username },
      select: ['username'],
    });

    if (userFound) throw new ConflictException(`El usuario ${userData.username} ya existe.`);

    const hashedPassword = bcrypt.hashSync(userData.password, 10);
    userData.password = hashedPassword;

    const user = this.usersRepository.create(userData);
    await this.usersRepository.save(user);

    return user;
  }

  async seeder() {
    const adminUser = process.env.ADMIN_NAME ? process.env.ADMIN_NAME : 'admin';
    const adminPassword = bcrypt.hashSync(process.env.ADMIN_PASSWORD ? process.env.ADMIN_PASSWORD : '1234', 10);

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
