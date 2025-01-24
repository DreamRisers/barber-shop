import { User } from 'src/user/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'barbers' })
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

  //Agregar relación con Turnos.
}
