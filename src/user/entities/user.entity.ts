import { Appointment } from 'src/appointment/entities/appointment.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

export enum Role {
  ADMIN = 'admin',
  BARBER = 'barber',
  CLIENT = 'client',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  userId: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  profileImg: string;

  @Column()
  role: Role;

  @OneToMany(() => Appointment, (appointment) => appointment.user)
  @JoinColumn()
  appointments: Appointment[];
}
