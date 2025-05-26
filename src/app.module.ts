import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from './config/config.module';
import { ConfigService } from './config/config.service';
import { ScheduleModule } from '@nestjs/schedule';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule,
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get('MONGODB_URI'),
      }),
      inject: [ConfigService],
    }),
    ScheduleModule.forRoot(),
    UsersModule,
  ],
})
export class AppModule {}
