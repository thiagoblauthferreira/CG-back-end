import { Body, Controller, Delete, Get, Param, Patch, Post, Put, UseGuards } from "@nestjs/common";
import { NeedItemService } from "./needItem.service";
import { CreateNeedItemDTO } from "./dto/request/createNeedItemDTO";
import { ResponseNeedItemDTO } from "./dto/response/responseNeedItemDTO";
import { ResponseNeedItemUpdateDTO } from "./dto/response/responseNeedItemUpdateDTO";
import { NeedItem } from "./entities/needItems.entity";
import { ResponseNeedItemUpdateDTOToList } from "./dto/response/responseNeedItemUpdateDTOToList";
import { AcceptedNeedDTO } from "./dto/request/accepetdNeedDTO";
import { ResponseNeedItemAcceptedDTO } from "./dto/response/responseNeedItemAcceptedDTO";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { AuthGuard } from "@nestjs/passport";

@ApiTags("Need-item")
@Controller('needs-item')
export class NeedItemController {

  constructor(
    private needItemService: NeedItemService,
   
  ){}

    @Post('register')
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    async register(@Body() createNeedItemDTO: CreateNeedItemDTO): Promise<ResponseNeedItemDTO> {
       return new ResponseNeedItemDTO(await this.needItemService.create(createNeedItemDTO))
    }

    @Get('need/:id')
    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth()
    async findById(@Param('id') id: string) {
        return new ResponseNeedItemDTO(await this.needItemService.findById(id))
    }

    @Put('update/:id')
    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth()
    async update(@Param('id') id: string, @Body() update: CreateNeedItemDTO) {
        return new ResponseNeedItemUpdateDTO(await this.needItemService.update(id, update));
    }
    
    @Delete('delete/:id')
    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth()
    async delete(@Param('id') id: string) {
      const remove = this.needItemService.delete(id);
      if(remove){
       return { success: true }
      }
      return { success: false }
    }

    @Get('need-all')
    async findByAll() {
        const needVolunteers: NeedItem[] = await this.needItemService.findAll();
        const responseItems = needVolunteers.map(need => new ResponseNeedItemUpdateDTOToList(need));
        return responseItems;
    }

    @Patch('need-accepted/:id')
    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth()
    async accepted(@Param('id') needId: string, @Body() userId: AcceptedNeedDTO) {
    return new ResponseNeedItemAcceptedDTO(await this.needItemService.accepted(needId, userId.userId));
    }   

}

