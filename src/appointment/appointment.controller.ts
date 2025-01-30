import { Body, Controller, Get, Param, ParseUUIDPipe, Post, Put } from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { CreateAppointmentDTO, UpdateAppointmentDTO } from './dto/appointment.dto';

@Controller('appointment')
export class AppointmentController {
  constructor(private readonly appointmentService: AppointmentService) {}

  @Post()
  createAppointment(@Body() appointmentData: CreateAppointmentDTO) {
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

  @Put(':id')
  updateAppointmentById(@Param('id', ParseUUIDPipe) id: string, @Body() appointmentData: UpdateAppointmentDTO) {
    return this.appointmentService.updateAppointmentById(id, appointmentData);
  }
}
