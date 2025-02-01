import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Appointment } from './entities/appointment.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateAppointmentDTO, UpdateAppointmentDTO } from './dto/appointment.dto';
import { Barber } from 'src/barber/entities/barber.entity';
import { Branch } from 'src/branch/entities/branch.entity';

@Injectable()
export class AppointmentService {
    constructor(
        @InjectRepository(Appointment) private readonly appointmentRepository: Repository<Appointment>,
        @InjectRepository(Barber) private readonly barberRepository: Repository<Barber>,
        @InjectRepository(Branch) private readonly branchRepository: Repository<Branch>,
    ) { }

    async createAppointment(appointmentData: CreateAppointmentDTO) {
        const foundBarber = await this.barberRepository.findOne({ where: { barberId: appointmentData.barber } });
        const foundBranch = await this.branchRepository.findOne({ where: { id: appointmentData.branch } });

        if (!foundBarber || !foundBranch) throw new NotFoundException("Barbero o sucursal no encontrados.");
 
        const createdAppointment = this.appointmentRepository.create({
            price: appointmentData.price,
            services: appointmentData.services,
            client_name: appointmentData.client_name,
            client_phone: appointmentData.client_phone,
            status: appointmentData.status,
            paymentMethod: appointmentData.paymentMethod,
            date: appointmentData.date,
            barber: foundBarber,
            branch: foundBranch
        });
        return await this.appointmentRepository.save(createdAppointment)
    }

    async getAppointments() {
        const appointments = await this.appointmentRepository.find({ relations: ['barber', 'branch'] });
        return appointments;
    }

    async getAppointmentById(id: string) {
        const appointment = await this.appointmentRepository.findOne({ where: { id }, relations: ['barber', 'branch'] })
        if (!appointment) throw new NotFoundException(`No se encontró un turno con el ID ${id}`);

        return appointment;
    }

    async updateAppointmentById(id: string, appointmentData: UpdateAppointmentDTO) {
        const appointment = await this.appointmentRepository.findOne({
            where: { id },
            relations: ['barber', 'branch']
        });

        if (!appointment) {
            throw new NotFoundException(`No se encontró un turno con el ID ${id}`);
        }

        if (appointmentData.barber) {
            const foundBarber = await this.barberRepository.findOne({ where: { barberId: appointmentData.barber } });
            if (!foundBarber) {
                throw new NotFoundException(`No se encontró un barbero con el ID ${appointmentData.barber}`);
            }
            appointment.barber = foundBarber;
        }

        if (appointmentData.branch) {
            const foundBranch = await this.branchRepository.findOne({ where: { id: appointmentData.branch } });
            if (!foundBranch) {
                throw new NotFoundException(`No se encontró una sucursal con el ID ${appointmentData.branch}`);
            }
            appointment.branch = foundBranch;
        }

        Object.assign(appointment, appointmentData);

        return await this.appointmentRepository.save(appointment);
    }

}
