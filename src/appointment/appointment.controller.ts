import { Controller, Get, Param, ParseUUIDPipe } from '@nestjs/common';
import { AppointmentService } from './appointment.service';

@Controller('appointment')
export class AppointmentController {
  constructor(private readonly appointmentService: AppointmentService) {}

  @Get()
  getAppointments() {
    return this.appointmentService.getAppointments();
  }

  @Get(':id')
  getAppointmentById(@Param('id', ParseUUIDPipe) id: string) {
    return this.appointmentService.getAppointmentById(id);
  }
}
