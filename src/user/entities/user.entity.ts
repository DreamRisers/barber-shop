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

  @Column({
    unique: true,
  })
  username: string;

  @Column()
  password: string;

  @Column({
    nullable: true
  })
  profileImg: string;

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.CLIENT,
  })
  role: Role;

  @OneToMany(() => Appointment, (appointment) => appointment.user)
  @JoinColumn()
  appointments: Appointment[];
}
