import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Barber } from './entities/barber.entity';
import { Repository } from 'typeorm';
import { CreateBarberDto, UpdateBarberDto } from './dto/barber.dto';

@Injectable()
export class BarberService {
  constructor(
    @InjectRepository(Barber) private barberRepository: Repository<Barber>,
  ) {}

  async create(createBarberDto: CreateBarberDto): Promise<Barber> {
    const barber = this.barberRepository.create(createBarberDto);
    return this.barberRepository.save(barber);
  }

  async update(id: string, updateBarberDto: UpdateBarberDto): Promise<Barber> {
    try {
      const barber = await this.barberRepository.findOne({
        where: { barberId: id },
      });
      if (!barber)
        throw new NotFoundException(`El barbero con id ${id} no existe.`);
      Object.assign(barber, updateBarberDto);

      return await this.barberRepository.save(barber);
    } catch {
      throw new BadRequestException(
        `Por favor, verifique nuevamente los datos ingresados.`,
      );
    }
  }

  async delete(id: string): Promise<string> {
    const barber = await this.barberRepository.findOne({
      where: { barberId: id },
    });

    if (!barber) {
      throw new NotFoundException(`El barbero con id ${id} no existe.`);
    }

    await this.barberRepository.remove(barber);

    return `Barbero eliminado con éxito.`;
  }

  async findAll(): Promise<Barber[]> {
    return this.barberRepository.find();
  }

  async findOne(id: string): Promise<Barber> {
    const barber = await this.barberRepository.findOne({
      where: { barberId: id },
    });

    if (!barber) {
      throw new NotFoundException(`El barbero con id ${id} no existe.`);
    }

    return barber;
  }
}
