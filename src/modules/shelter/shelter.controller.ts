import {
  Controller,
  Post,
  Body,
  Patch,
  Param,
  Get,
  Delete,
  HttpStatus,
  HttpCode,
  UseGuards,
  Query,
} from '@nestjs/common';
import { CreateShelterDto } from './dto/create-shelter.dto';
import { ShelterService } from './shelter.service';
import { UpdateShelterDto } from './dto';
import {
  SearchCoordinatorDto,
  ShelterCoordinatorDto,
} from './dto/coordinator.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { CreateUserDto } from '../auth/dto/auth.dto';
import { ApiTags } from '@nestjs/swagger';
import { SearchShelter } from './dto/search-shelter';

@ApiTags('Shelter')
@Controller('shelter')
export class ShelterController {
  constructor(private shelterService: ShelterService) {}

  @Post('/')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('coordinator', 'user')
  async create(
    @CurrentUser() currentUser: CreateUserDto,
    @Body() createShelter: CreateShelterDto,
  ) {
    return await this.shelterService.create(createShelter, currentUser);
  }

  @Patch('/:shelterId')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('coordinator', 'user')
  async update(
    @Param('shelterId') shelterId: string,
    @Body() updateShelter: UpdateShelterDto,
  ) {
    return await this.shelterService.update(updateShelter, shelterId);
  }

  @Get('/')
  @UseGuards(AuthGuard('jwt'))
  async listAll(@Query() query: SearchShelter) {
    return await this.shelterService.listAll(query);
  }

  @Get('/:shelterId')
  @UseGuards(AuthGuard('jwt'))
  async findOne(
    @CurrentUser() currentUser: CreateUserDto,
    @Param('shelterId') shelterId: string,
  ) {
    return await this.shelterService.findOne(
      shelterId,
      {
        address: true,
        creator: true,
      },
      currentUser,
    );
  }

  @Get('/:shelterId/coordinators')
  @UseGuards(AuthGuard('jwt'))
  async listCoordinatorsByShelter(
    @Param('shelterId') shelterId: string,
    @Query() query: SearchCoordinatorDto,
  ) {
    return await this.shelterService.listCoordinators(shelterId, query);
  }

  @Delete('/:shelterId')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('shelterId') shelterId: string) {
    return await this.shelterService.remove(shelterId);
  }

  @Patch('/:shelterId/coordinators')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('coordinator', 'user')
  async addOrRemoveCoordinator(
    @Param('shelterId') shelterId: string,
    @Body() coordinationAction: ShelterCoordinatorDto,
  ) {
    const { action, coordinatorId } = coordinationAction;
    if (action === 'add') {
      return await this.shelterService.addCoordinator(shelterId, coordinatorId);
    }
    if (action === 'remove') {
      return await this.shelterService.removeCoordinator(
        shelterId,
        coordinatorId,
      );
    }
  }
}
