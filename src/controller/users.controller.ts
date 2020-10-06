import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { UserService } from '../service/user.service';

import { OkResponse,ErrorResponse } from "@roit/roit-response-handler";
import { Response } from '../model/response';
import { User } from '../model/user';

@Controller('users')
export class UsersController {

  constructor(
    private userService: UserService
  ){}

  @Get()
  async getAll() : Promise<Response>{
    try {
      return OkResponse(this.userService.getAll());
    } catch (error) {
      return ErrorResponse(error);
    }    
  }

  @Get(':id')
  async getById(@Param('id') id: number) : Promise<Response>{
    try {
      return OkResponse(this.userService.getById(id));
    } catch (error) {
      return ErrorResponse(error);
    }    
  }

  @Post()
  async create(@Body() user: User) : Promise<Response> {
    try {
      return OkResponse(await this.userService.create(user));
    } catch (error) {
      return ErrorResponse(error);
    }    
  }
  
  @Put(':id')
  async update(@Body() user: User,@Param('id') id: number) : Promise<Response> {
    try {
      user.id = id;
      return OkResponse(await this.userService.update(user));
    } catch (error) {
      return ErrorResponse(error);
    }    
  }

  @Delete(':id')
  async delete(@Param('id') id: number){
    try {
      return this.userService.delete(id);
    } catch (error) {
      return ErrorResponse(error);
    }    
  }
}
