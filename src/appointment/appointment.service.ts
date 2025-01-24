import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Appointment } from './entities/appointment.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AppointmentService {
    constructor(
        @InjectRepository(Appointment) private readonly appointmentRepository: Repository<Appointment>,
    ) {}

    async getAppointments() {
        const appointments = await this.appointmentRepository.find();
        return appointments;
    }


}
