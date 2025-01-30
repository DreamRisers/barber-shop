import { Barber } from 'src/barber/entities/barber.entity';
import { Branch } from 'src/branch/entities/branch.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

export enum AppointmentStatus {
  PENDING = 'pending',
  PAID = 'paid',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
}

export enum PaymentMethod {
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
    nullable: true,
  })
  services: string;

  @Column()
  client_name: string;

  @Column()
  client_phone: string;

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

  @ManyToOne(() => Barber, (barber) => barber.appointments)
  @JoinColumn({ name: 'barberId' })
  barber: Barber;

  @ManyToOne(() => Branch, (branch) => branch.appointments)
  @JoinColumn({ name: 'branchId' })
  branch: Branch;

  @ManyToOne(() => User, (user) => user.appointments)
  @JoinColumn({ name: 'userId' })
  user: User;
}
