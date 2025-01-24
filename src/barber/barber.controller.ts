import { Controller, Post } from '@nestjs/common';
import { BarberService } from './barber.service';
import { CreateBarberDto } from './dto/barber.dto';

@Controller('barber')
export class BarberController {
  constructor(private readonly barberService: BarberService) {}

  @Post()
  create(createBarberDto: CreateBarberDto) {
    return this.barberService.create(createBarberDto);
  }
}
