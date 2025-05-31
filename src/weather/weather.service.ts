import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { ConfigSetupService } from '../config/config.service';

@Injectable()
export class WeatherService {
  constructor(private readonly configService: ConfigSetupService) {}

  async getForecast(city: string = 'Kyiv') {
    const apiKey = this.configService.get('OPENWEATHER_API_KEY');
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    const { data } = await axios.get(url);
    return data;
  }
}
