import { Appointment } from 'src/appointment/entities/appointment.entity';
import { Branch } from 'src/branch/entities/branch.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
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
  @JoinColumn({ name: 'userId' })
  user: User;

  @OneToMany(() => Appointment, (appointment) => appointment.barber)
  appointments: Appointment[];

  @ManyToOne(() => Branch, (branch) => branch.barbers)
  @JoinColumn({ name: 'branchId' })
  branch: Branch;
}
