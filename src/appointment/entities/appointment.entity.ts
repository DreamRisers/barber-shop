import { Client } from "src/client/entities/client.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

enum AppointmentStatus {
    PENDING = 'pending',
    COMPLETED = 'completed',
    CANCELLED = 'cancelled'
}

enum PaymentMethod {
    CASH = 'cash',
    TRANSFER = 'transfer'
}

@Entity({ name: 'appointment' })
export class Appointment {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        type: 'number',
        nullable: false
    })
    price: number;

    @Column({
        type: 'enum',
        enum: AppointmentStatus,
        default: AppointmentStatus.PENDING
    })
    status: AppointmentStatus;

    @Column({
        type: 'enum',
        enum: PaymentMethod,
        default: PaymentMethod.CASH
    })
    paymentMethod: PaymentMethod;

    @Column({
        type: 'date',
        nullable: false
    })
    date: Date;

    @ManyToOne(() => Client, client => client.appointments)
    client: Client;

    // Relacion con barberos

    // Relacion con usuarios
}