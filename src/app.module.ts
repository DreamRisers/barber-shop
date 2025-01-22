import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { BarberModule } from './barber/barber.module';
import { ClientModule } from './client/client.module';
import { ServicesModule } from './services/services.module';
import { SalesModule } from './sales/sales.module';

@Module({
  imports: [UserModule, BarberModule, ClientModule, ServicesModule, SalesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
