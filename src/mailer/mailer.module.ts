import { Module } from '@nestjs/common';
import { MailerService } from './mailer.service';
import {ConfigSetupModule} from "../config/config.module";

@Module({
  providers: [MailerService],
  exports: [MailerService],
  imports: [ConfigSetupModule],
})
export class MailerModule {}
