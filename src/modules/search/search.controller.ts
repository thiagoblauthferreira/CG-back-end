import { Controller, Get, Query } from "@nestjs/common";
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from "@nestjs/swagger";
import { SearchDto } from "./dto/searchDTO";
import { SearchService } from "./search.service";
import { Pagination } from "nestjs-typeorm-paginate";
import { SearchShelterResponseDto } from "./dto/searchShelterResponseDto";
import { SearchDistributionPointResponseDto } from "./dto/searchDistributionPointResponseDto copy";
import { ResponseNeedVolunteerUpdateDTO } from "./dto/responseVolunteers";
import { ResponseNeedItemUpdateDTO } from "./dto/responseNeedItemUpdateDTO";



@ApiTags('Search')
@Controller('search')
export class SearchController {
  constructor(private searchService: SearchService) {}

  // Buscar Abrigos
  @Get('shelters')
  @ApiOperation({ summary: 'Buscar abrigos' })
  @ApiResponse({ status: 200, description: 'Busca realizada com sucesso' })
  async findShelter(@Query() query: SearchDto): Promise<Pagination<SearchShelterResponseDto>> {
    const { page = 1, pageSize = 10 } = query;
    const paginatedResult = await this.searchService.findShelter(query);
    const items = paginatedResult.items.map(item => new SearchShelterResponseDto(item));
    return {
      ...paginatedResult,
      items,
    };
  }

  // Buscar Pontos de Distribuição
  @Get('distribution-points')
  @ApiOperation({ summary: 'Buscar pontos de distribuição' })
  @ApiResponse({ status: 200, description: 'Busca realizada com sucesso' })
  async findDistribututionPoints(@Query() query: SearchDto): Promise<Pagination<SearchDistributionPointResponseDto>> {
    const { page = 1, pageSize = 10 } = query;
    const paginatedResult = await this.searchService.findDistribututionPoints(query);
    const items = paginatedResult.items.map(item => new SearchDistributionPointResponseDto(item));
    return {
      ...paginatedResult,
      items,
    };
  }

  // Buscar Necessidades de Voluntários
  @Get('volunteer-needs')
  @ApiOperation({ summary: 'Buscar necessidades de voluntários' })
  @ApiResponse({ status: 200, description: 'Busca realizada com sucesso' })
  async findNeedVolunteer(@Query() query: SearchDto): Promise<Pagination<ResponseNeedVolunteerUpdateDTO>> {
    const { page = 1, pageSize = 10 } = query;
    const paginatedResult = await this.searchService.findNeedVolunteer(query);
    const items = paginatedResult.items.map(item => new ResponseNeedVolunteerUpdateDTO(item));
    return {
      ...paginatedResult,
      items,
    };
  }

  // Buscar Necessidades de Itens
  @Get('item-needs')
  @ApiOperation({ summary: 'Buscar necessidades de itens' })
  @ApiResponse({ status: 200, description: 'Busca realizada com sucesso' })
  async findNeedItem(@Query() query: SearchDto): Promise<Pagination<ResponseNeedItemUpdateDTO>> {
    const { page = 1, pageSize = 10 } = query;
    const paginatedResult = await this.searchService.findNeedItem(query);
    const items = paginatedResult.items.map(item => new ResponseNeedItemUpdateDTO(item));
    return {
      ...paginatedResult,
      items,
    };
  }
}