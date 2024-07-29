import { Controller, Get, InternalServerErrorException, Query } from "@nestjs/common";
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from "@nestjs/swagger";
import { SearchDto } from "./dto/searchDTO";
import { SearchService } from "./search.service";
import { SearchShelterResponseDto } from "./dto/responseShelterDTO";
import { ResponseNeedVolunteerUpdateDTO } from "./dto/responseVolunteersDTO";
import { ResponseNeedItemUpdateDTO } from "./dto/responseNeedItemUpdateDTO";
import { Shelter } from "../shelter/entities/shelter.entity";
import { DistribuitionPoints } from "../distriuition-points/entities/distribuition-point.entity";
import { NeedVolunteers } from "../need/entities/needVolunteers.entity";
import { NeedItem } from "../need/entities/needItems.entity";
import { ResponseDistributionPointDTO } from "./dto/responseDistributionPointDTO";
import { RequestShelterDTO } from "./dto/requestShelterDTO";
import { RequestNeedsDTO } from "./dto/requestNeedsDTO";


@ApiTags('Search')
@Controller('search')
export class SearchController {
  constructor(private searchService: SearchService) {}

  // Buscar Abrigos
  @Get('shelters')
  @ApiOperation({ summary: 'Buscar abrigos' })
  async findShelter(@Query() query: RequestShelterDTO): Promise<SearchShelterResponseDto[]> {
    try {
      const itens: Shelter[] = await this.searchService.findShelter(query);
      return itens.map(shelter => new SearchShelterResponseDto(shelter));
    } catch (error) {
      throw new InternalServerErrorException('Erro ao buscar abrigos');
    }
  }

  // Buscar Pontos de Distribuição
  @Get('distribution-points')
  @ApiOperation({ summary: 'Buscar pontos de distribuição' })
  async findDistribututionPoints(@Query() query: RequestShelterDTO): Promise<ResponseDistributionPointDTO[]> {
    try{
      const itens: DistribuitionPoints[] = await this.searchService.findDistribututionPoints(query);
      return itens.map(a => new ResponseDistributionPointDTO(a));
     }catch (error){
      throw new InternalServerErrorException('Erro ao buscar pontos de distribuição');
    }
  }

  // Buscar Necessidades de Voluntários
  @Get('volunteer-needs')
  @ApiOperation({ summary: 'Buscar necessidades de voluntários' })
  @ApiResponse({ status: 200, description: 'Busca realizada com sucesso' })
  async findNeedVolunteer(@Query() query: RequestNeedsDTO): Promise<ResponseNeedVolunteerUpdateDTO[]> {
    try {
      const itens: NeedVolunteers[] = await this.searchService.findNeedVolunteer(query);
      return itens.map(n => new ResponseNeedVolunteerUpdateDTO(n))

    }catch (error){
      throw new InternalServerErrorException('Erro ao buscar pontos de distribuição');
    }
    
  }

  // Buscar Necessidades de Itens
  @Get('need-item')
  @ApiOperation({ summary: 'Buscar necessidades de itens' })
  @ApiResponse({ status: 200, description: 'Busca realizada com sucesso' })
  async findNeedItem(@Query() query: RequestNeedsDTO): Promise<ResponseNeedItemUpdateDTO[]> {
  try{
    const itens: NeedItem[] =  await this.searchService.findNeedItem(query);
    return itens.map(n => new ResponseNeedItemUpdateDTO(n))
  }catch (error){
    throw new InternalServerErrorException('Erro ao buscar pontos de distribuição');
  }
  }
}