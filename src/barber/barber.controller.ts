import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { BarberService } from './barber.service';
import { CreateBarberDto, UpdateBarberDto } from './dto/barber.dto';

@Controller('barber')
export class BarberController {
  constructor(private readonly barberService: BarberService) {}

  @Post()
  create(@Body() createBarberDto: CreateBarberDto) {
    return this.barberService.create(createBarberDto);
  }

  @Get()
  findAll() {
    return this.barberService.findAll();
  }

  @Get(':barberId')
  findOne(@Param('barberId', ParseUUIDPipe) id: string) {
    return this.barberService.findOne(id);
  }

  @Put(':barberId')
  update(
    @Param('barberId', ParseUUIDPipe) id: string,
    @Body() updateBarberDto: UpdateBarberDto,
  ) {
    return this.barberService.update(id, updateBarberDto);
  }

  @Delete(':barberId')
  delete(@Param('barberId', ParseUUIDPipe) id: string) {
    return this.barberService.delete(id);
  }
}
