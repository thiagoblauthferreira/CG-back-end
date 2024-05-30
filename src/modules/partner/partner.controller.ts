import { Controller, Delete, Get, Post, Put } from "@nestjs/common";

@Controller('partner')
export default class PartnerController {

  @Post()
  async register() {
  
  }

  @Put()
  async update() {
  
  }

  @Get('hello')
  async findById() {
  return 'hello'
  }

  @Delete()
  async delete() {
  
  }

  @Get()
  async findAll(){

  }
}