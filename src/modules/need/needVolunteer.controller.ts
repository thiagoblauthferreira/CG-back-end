import { Controller, Delete, Get, Patch, Post } from "@nestjs/common";
import { NeedVolunteerService } from "./needVolunteer.service";

@Controller('needs-volunteer')
export class NeedVolunteerController {

  constructor(private needVolunteerService: NeedVolunteerService){}


    @Post('register')
    async register() {
        
    }

    @Patch('update/:id')
    async update() {
        
    }
    @Delete('register')
    async delete() {
        
    }

    @Get(':id')
    async findById() {
        
    }

}