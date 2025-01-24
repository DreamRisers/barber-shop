import { Appointment } from 'src/appointment/entities/appointment.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'barber' })
export class Barber {
  @PrimaryGeneratedColumn('uuid')
  barberId: string;

  @Column()
  name: string;

  @Column()
  experience: string;

  @Column()
  services: string;

  @Column()
  profileImg: string;

  @OneToOne(() => User, (user) => user.role)
  @JoinColumn()
  user: User;

  @OneToMany(() => Appointment, (appointment) => appointment.barber)
  @JoinColumn()
  appointments: Appointment[];
}
