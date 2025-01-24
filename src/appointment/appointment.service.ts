import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Appointment } from './entities/appointment.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AppointmentService {
    constructor(
        @InjectRepository(Appointment) private readonly appointmentRepository: Repository<Appointment>,
    ) {}

    async createAppointment(appointmentData) {
        const createdAppointment = this.appointmentRepository.create(appointmentData);
        return await this.appointmentRepository.save(createdAppointment)
    }

    async getAppointments() {
        const appointments = await this.appointmentRepository.find({ relations: ['barber'] });
        return appointments;
    }

    async getAppointmentById(id: string) {
        const appointment = await this.appointmentRepository.findOne({where: {id}, relations: ['barber']})
        if(!appointment) throw new NotFoundException(`No se encontró un turno con el ID ${id}`);

        return appointment;
    }
}
