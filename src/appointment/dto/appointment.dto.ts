import { AppointmentStatus, PaymentMethod } from "../entities/appointment.entity";

export class CreateAppointmentDTO {
    price: number;

    services: string;

    client_name: string;

    client_phone: number;

    status: AppointmentStatus;

    paymentMethod: PaymentMethod;

    date: Date;
}
