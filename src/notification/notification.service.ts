import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class NotificationService {
  constructor(
    @InjectModel('Notification') private readonly notificationModel: Model<any>,
  ) {}

  async logNotification(email: string, city: string, message: string) {
    return this.notificationModel.create({ email, city, message });
  }

  async findByEmail(email: string) {
    return this.notificationModel.find({ email }).sort({ date: -1 }).exec();
  }
}