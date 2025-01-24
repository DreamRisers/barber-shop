import { Barber } from 'src/barber/entities/barber.entity';
import { Client } from 'src/client/entities/client.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

enum AppointmentStatus {
  PENDING = 'pending',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
}

enum PaymentMethod {
  CASH = 'cash',
  TRANSFER = 'transfer',
}

@Entity({ name: 'appointment' })
export class Appointment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    nullable: false,
  })
  price: number;

  @Column({
    type: 'enum',
    enum: AppointmentStatus,
    default: AppointmentStatus.PENDING,
  })
  status: AppointmentStatus;

  @Column({
    type: 'enum',
    enum: PaymentMethod,
    default: PaymentMethod.CASH,
  })
  paymentMethod: PaymentMethod;

  @Column({
    type: 'date',
    nullable: false,
  })
  date: Date;

  @ManyToOne(() => Client, (client) => client.appointments)
  client: Client;

  @ManyToOne(() => Barber, (barber) => barber.appointments)
  @JoinColumn({ name: 'barberId' })
  barber: Barber;

  @ManyToOne(() => User, (user) => user.appointments)
  @JoinColumn({ name: 'userId' })
  user: User;
}
