import { Module } from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { AppointmentController } from './appointment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Appointment } from './entities/appointment.entity';
import { Barber } from 'src/barber/entities/barber.entity';
import { Branch } from 'src/branch/entities/branch.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Appointment, Barber, Branch])],
  controllers: [AppointmentController],
  providers: [AppointmentService],
})
export class AppointmentModule {}
