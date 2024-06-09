import { Body, Controller, Delete, Get, Param, Patch, Post, Put, UseGuards } from "@nestjs/common";
import { NeedVolunteerService } from "./needVolunteer.service";
import { CreateVolunteerDTO } from "./dto/request/createNeedVolunteerDTO";
import { ResponseNeedVolunteerDTO } from "./dto/response/responseVolunteer";
import { ResponseNeedVolunteerUpdateDTO } from "./dto/response/responseUpdateVolunteers";
import { NeedVolunteers } from "./entities/needVolunteers.entity";
import { ResponseNeedVolunteerUpdateDTOToList } from "./dto/response/responseUpdateVolunteersToList";
import { AcceptedNeedDTO } from "./dto/request/accepetdNeedDTO";
import { ApiTags } from "@nestjs/swagger";
import { AuthGuard } from "@nestjs/passport";
import { CancelNeedDTO } from "./dto/request/cancelNeedDTO";

@ApiTags("Need-volunteer")
@Controller('needs-volunteer')
export class NeedVolunteerController {

  constructor(private needVolunteerService: NeedVolunteerService){}

    @Post('register')
    @UseGuards(AuthGuard('jwt'))
    async register(@Body() createVolunteerDTO: CreateVolunteerDTO) {
        return new ResponseNeedVolunteerDTO( await this.needVolunteerService.create(createVolunteerDTO));
    }

    @Put('update/:id')
    @UseGuards(AuthGuard('jwt'))
    async update(@Param('id') id:string, @Body() update: CreateVolunteerDTO) {
        return new ResponseNeedVolunteerUpdateDTO(await this.needVolunteerService.update(id, update))
    }
    @Delete('delete/:id')
    @UseGuards(AuthGuard('jwt'))
    async delete(@Param('id') id:string ) {
        const remove = await this.needVolunteerService.delete(id)
        if(remove){
          return { success: true }
         }
         return { success: false }
    }

    @Get('need/:id')
    @UseGuards(AuthGuard('jwt'))
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
    @UseGuards(AuthGuard('jwt'))
    async accepted(@Param('id') needId: string, @Body() acceptedNeedDTO: AcceptedNeedDTO) {
     return new ResponseNeedVolunteerUpdateDTO(await this.needVolunteerService.accepted(needId, acceptedNeedDTO.userId, acceptedNeedDTO.status));
    }   

    @Patch('need-cancel/:id')
    @UseGuards(AuthGuard('jwt'))
    async cancel(@Param('id') needId: string, @Body() cancelNeedDTO: CancelNeedDTO) {
     return new ResponseNeedVolunteerUpdateDTO(await this.needVolunteerService.canceled(needId, cancelNeedDTO.userId));
    }   

}