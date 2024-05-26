import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { NeedVolunteerService } from "./needVolunteer.service";
import { CreateVolunteerDTO } from "./dto/request/createNeedVolunteerDTO";
import { ResponseNeedVolunteerDTO } from "./dto/response/responseVolunteer";
import { ResponseNeedVolunteerUpdateDTO } from "./dto/response/responseUpdateVolunteers";

@Controller('needs-volunteer')
export class NeedVolunteerController {

  constructor(private needVolunteerService: NeedVolunteerService){}


    @Post('register')
    async register(@Body() createVolunteerDTO: CreateVolunteerDTO) {
        return new ResponseNeedVolunteerDTO( await this.needVolunteerService.create(createVolunteerDTO));
    }

    @Patch('update/:id')
    async update(@Param('id') id:string, @Body() update: CreateVolunteerDTO) {
        return new ResponseNeedVolunteerUpdateDTO(await this.needVolunteerService.update(id, update))
    }
    @Delete('delete/:id')
    async delete(@Param('id') id:string ) {
        const remove = await this.needVolunteerService.delete(id)
        if(remove){
          return { success: true }
         }
         return { success: false }
    }

    @Get('need/:id')
    async findById(@Param('id') id:string ) {
        return new ResponseNeedVolunteerUpdateDTO( await this.needVolunteerService.find(id))
    }

}