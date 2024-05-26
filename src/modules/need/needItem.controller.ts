import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { NeedItemService } from "./needItem.service";
import { CreateNeedItemDTO } from "./dto/request/createNeedItemDTO";
import { ResponseNeedItemDTO } from "./dto/response/responseNeedItemDTO";
import { ResponseNeedItemUpdateDTO } from "./dto/response/responseNeedItemUpdateDTO";

@Controller('needs-item')
export class NeedItemController {

  constructor(
    private needItemService: NeedItemService,
   
  ){}

    @Post('register')
    async register(@Body() createNeedItemDTO: CreateNeedItemDTO): Promise<ResponseNeedItemDTO> {
       return new ResponseNeedItemDTO(await this.needItemService.create(createNeedItemDTO))
    }

    @Get('need/:id')
    async findById(@Param('id') id: string) {
        return new ResponseNeedItemUpdateDTO(await this.needItemService.findById(id))
    }

    @Patch('update/:id')
    async update(@Param('id') id: string, @Body() update: CreateNeedItemDTO) {
        return new ResponseNeedItemUpdateDTO(await this.needItemService.update(id, update));
    }
    @Delete('delete/:id')
    async delete(@Param('id') id: string) {
      const remove = this.needItemService.delete(id);
      if(remove){
       return { success: true }
      }
      return { success: false }
    }

   

}