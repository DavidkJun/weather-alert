import { Module } from '@nestjs/common';
import { WeatherService } from './weather.service';
import {ConfigSetupModule} from "../config/config.module";
import {WeatherController} from "./weather.controller";

@Module({
  imports: [ConfigSetupModule],
  controllers: [WeatherController],
  providers: [WeatherService],
  exports: [WeatherService],
})
export class WeatherModule {}