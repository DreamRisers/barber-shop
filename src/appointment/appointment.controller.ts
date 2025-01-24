import { Controller, Get, Param, ParseUUIDPipe, Post } from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { CreateAppointmentDTO } from './dto/appointment.dto';

@Controller('appointment')
export class AppointmentController {
  constructor(private readonly appointmentService: AppointmentService) {}

  @Post()
  createAppointment(appointmentData: CreateAppointmentDTO) {
    return this.appointmentService.createAppointment(appointmentData);
  }

  @Get()
  getAppointments() {
    return this.appointmentService.getAppointments();
  }

  @Get(':id')
  getAppointmentById(@Param('id', ParseUUIDPipe) id: string) {
    return this.appointmentService.getAppointmentById(id);
  }
}
