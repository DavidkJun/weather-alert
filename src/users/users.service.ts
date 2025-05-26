import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private userModel: Model<any>) {}

  async create(email: string, city: string, conditions: string[]) {
    return this.userModel.create({ email, city, conditions });
  }

  async findAll() {
    return this.userModel.find().exec();
  }
}
