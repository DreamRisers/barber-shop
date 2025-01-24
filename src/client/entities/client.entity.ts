import { Appointment } from "src/appointment/entities/appointment.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'client' })
export class Client {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        nullable: true,
    })
    phone: number;

    @OneToMany(() => Appointment, appointment => appointment.client)
    appointments: Appointment[];
}