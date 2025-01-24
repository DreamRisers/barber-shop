import { Appointment } from "src/appointment/entities/appointment.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'client' })
export class Client {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        type: 'number',
        nullable: true,
        length: 13
    })
    phone: number;

    @OneToMany(() => Appointment, appointment => appointment.client)
    appointments: Appointment[];
}