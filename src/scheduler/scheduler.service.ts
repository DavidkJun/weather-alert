import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { UsersService } from '../users/users.service';
import { WeatherService } from '../weather/weather.service';
import { MailerService } from '../mailer/mailer.service';

@Injectable()
export class SchedulerService {
  constructor(
    private readonly usersService: UsersService,
    private readonly weatherService: WeatherService,
    private readonly mailerService: MailerService,
  ) {}

  @Cron('0 * * * * *')
  async handleCron() {
    const users = await this.usersService.findAll();

    for (const user of users) {
      const weather = await this.weatherService.getForecast(user.city);
      const actualConditions = weather.weather.map((w) =>
        w.main.toLowerCase(),
      );

      const matched = user.conditions.some((cond: string) =>
        actualConditions.includes(cond.toLowerCase()),
      );

      if (matched) {
        const message = `In ${user.city}: ${weather.weather[0].description}, ${weather.main.temp}°C`;
        await this.mailerService.sendEmail(user.email, 'Weather Alert', message);
      }
    }
  }
}
