import { Module } from '@nestjs/common';
import { SchedulerService } from './scheduler.service';
import { ScheduleModule } from '@nestjs/schedule';
import { UsersModule } from '../users/users.module';
import { WeatherModule } from '../weather/weather.module';
import { MailerModule } from '../mailer/mailer.module';
import {NotificationModule} from "../notification/notification.module";

@Module({
  imports: [
    ScheduleModule.forRoot(),
    UsersModule,
    WeatherModule,
    MailerModule,
    NotificationModule
  ],
  providers: [SchedulerService],
})
export class SchedulerModule {}