import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Barber } from './entities/barber.entity';
import { Repository } from 'typeorm';
import { CreateBarberDto } from './dto/barber.dto';

@Injectable()
export class BarberService {
  constructor(
    @InjectRepository(Barber) private barberRepository: Repository<Barber>,
  ) {}

  async create(createBarberDto: CreateBarberDto) {
    const barber = this.barberRepository.create(createBarberDto);
    return this.barberRepository.save(barber);
  }
}
