import { Controller, Get, Query } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { SearchDto } from "./dto/SearchDTO";
import { SearchService } from "./search.service";
import { Pagination } from "nestjs-typeorm-paginate";
import { Shelter } from "../shelter/entities/shelter.entity";
import { NeedItem } from "../need/entities/needItems.entity";
import { NeedVolunteers } from "../need/entities/needVolunteers.entity";


@ApiTags("Search")
@Controller('search')
export class SearchController {
  constructor(private searchService: SearchService){}

  //shelter
  @Get('shelters')
  async findShelter(@Query() query: SearchDto): Promise<Pagination<Shelter>>{
    const { page = 1, pageSize = 10 } = query;
    this.searchService.findShelter(query);
    return null;
  }

  //pontos de distribuição
  @Get('distribution-points')
  async findDistribututionPoints(@Query() query: SearchDto): Promise<Pagination<Shelter>>{
    const { page = 1, pageSize = 10 } = query;
    await this.searchService.findDistribututionPoints(query);
    return null;
  }
  //necessidades de itens
  @Get('volunteer-needs')
  async findNeedVolunteer(@Query() query: SearchDto): Promise<Pagination<NeedVolunteers>>{
    const { page = 1, pageSize = 10 } = query;
    return await this.searchService.findNeedVolunteer(query);
    
  }
  //necessidades de vonluntários
  
  @Get('item-needs')
  async findNeedItem(@Query() query: SearchDto): Promise<Pagination<NeedItem>>{
    const { page = 1, pageSize = 10 } = query;
    return await this.searchService.findNeedItem(query);
    
  }


}