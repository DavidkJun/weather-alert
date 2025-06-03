import { Controller, Get, Query } from '@nestjs/common';
import { NotificationService } from './notification.service';

@Controller('notifications')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Get()
  async getByEmail(@Query('email') email: string) {
    return this.notificationService.findByEmail(email);
  }
}