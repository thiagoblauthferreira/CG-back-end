import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from "@nestjs/common";
import { NeedVolunteerService } from "./needVolunteer.service";
import { CreateVolunteerDTO } from "./dto/request/createNeedVolunteerDTO";
import { ResponseNeedVolunteerDTO } from "./dto/response/responseVolunteer";
import { ResponseNeedVolunteerUpdateDTO } from "./dto/response/responseUpdateVolunteers";
import { NeedVolunteers } from "./entities/needVolunteers.entity";
import { ResponseNeedVolunteerUpdateDTOToList } from "./dto/response/responseUpdateVolunteers copy";
import { AcceptedNeedDTO } from "./dto/request/accepetdNeedDTO";

@Controller('needs-volunteer')
export class NeedVolunteerController {

  constructor(private needVolunteerService: NeedVolunteerService){}


    @Post('register')
    async register(@Body() createVolunteerDTO: CreateVolunteerDTO) {
        return new ResponseNeedVolunteerDTO( await this.needVolunteerService.create(createVolunteerDTO));
    }

    @Put('update/:id')
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

    @Get('need-all')
    async findByAll() {
        const needVolunteers: NeedVolunteers[] = await this.needVolunteerService.findAll();
        const responseItems = needVolunteers.map(need => new ResponseNeedVolunteerUpdateDTOToList(need));
        return responseItems;
    }

    @Patch('need-accepted/:id')
    async accepted(@Param('id') needId: string, @Body() userId: AcceptedNeedDTO) {
     return new ResponseNeedVolunteerUpdateDTO(await this.needVolunteerService.accepted(needId, userId.userId));
   
    }   

}