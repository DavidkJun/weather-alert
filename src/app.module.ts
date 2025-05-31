import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigSetupModule } from './config/config.module';
import { ConfigSetupService } from './config/config.service';
import { ScheduleModule } from '@nestjs/schedule';
import { UsersModule } from './users/users.module';
import { MailerModule } from './mailer/mailer.module';
import { SchedulerModule } from './scheduler/scheduler.module';
import {ConfigModule} from "@nestjs/config";

@Module({
  imports: [
    ConfigSetupModule,
    MongooseModule.forRootAsync({
      imports: [ConfigSetupModule],
      useFactory: (configService: ConfigSetupService) => ({
        uri: configService.get('MONGODB_URI'),
      }),
      inject: [ConfigSetupService],
    }),
    ConfigModule.forRoot({
      isGlobal: true, 
    }),
    ScheduleModule.forRoot(),
    UsersModule,
    MailerModule,
    SchedulerModule,
  ],
})
export class AppModule {}
