import { Module } from '@nestjs/common';
import { ConfigSetupService } from './config.service';

@Module({
  providers: [ConfigSetupService],
  exports: [ConfigSetupService],
})
export class ConfigSetupModule {}