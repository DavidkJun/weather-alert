import { Controller, Post, Body, Get } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(
    @Body('email') email: string,
    @Body('city') city: string,
    @Body('conditions') conditions: string[],
  ) {
    return this.usersService.create(email, city, conditions);
  }

  @Get()
  async getAll() {
    return this.usersService.findAll();
  }
}

