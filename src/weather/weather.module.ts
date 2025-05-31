import { Module } from '@nestjs/common';
import { WeatherService } from './weather.service';
import {ConfigSetupModule} from "../config/config.module";

@Module({
  imports: [ConfigSetupModule],
  providers: [WeatherService],
  exports: [WeatherService],
})
export class WeatherModule {}