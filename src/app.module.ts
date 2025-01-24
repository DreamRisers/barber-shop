/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { BarberModule } from './barber/barber.module';
import { ClientModule } from './client/client.module';
import { AppointmentModule } from './appointment/appointment.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import typeorm from './config/typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [typeorm] }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configTypeORM: ConfigService) => {
        const config = configTypeORM.get('typeorm');
        if (!config) {
          throw new Error('TypeORM configuration is missing');
        }
        return config;  // Asegura que siempre devuelve un objeto de configuración
      },
    }),
    UserModule,
    BarberModule,
    ClientModule,
    AppointmentModule,
  ],
})
export class AppModule { }
