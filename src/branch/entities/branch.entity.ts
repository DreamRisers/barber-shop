import { Appointment } from 'src/appointment/entities/appointment.entity';
import { Barber } from 'src/barber/entities/barber.entity';
import {
    Column,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'branch' })
export class Branch {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        unique: true
    })
    name: string;

    @OneToMany(() => Appointment, (appointment) => appointment.branch)
    appointments: Appointment[];

    @OneToMany(() => Barber, (barber) => barber.branch)
    barbers: Barber[];
}
