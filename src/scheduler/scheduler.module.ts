import { Module } from '@nestjs/common';
import { SchedulerService } from './scheduler.service';
import { ScheduleModule } from '@nestjs/schedule';
import { UsersModule } from '../users/users.module';
import { WeatherModule } from '../weather/weather.module';
import { MailerModule } from '../mailer/mailer.module';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    UsersModule,
    WeatherModule,
    MailerModule,
  ],
  providers: [SchedulerService],
})
export class SchedulerModule {}