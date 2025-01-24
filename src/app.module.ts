import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { BarberModule } from './barber/barber.module';
import { ClientModule } from './client/client.module';
import { ServicesModule } from './services/services.module';
import { SalesModule } from './appointments/appointment.module';
import { AppointmentModule } from './appointment/appointment.module';

@Module({
  imports: [
    UserModule,
    BarberModule,
    ClientModule,
    ServicesModule,
    SalesModule,
    AppointmentModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
