import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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

  //Agregar relación con Turnos.
}
