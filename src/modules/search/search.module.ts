import { Module } from '@nestjs/common';
import { SearchService } from './search.service';
import { SearchController } from './search.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Shelter } from '../shelter/entities/shelter.entity';
import { DistribuitionPoints } from '../distriuition-points/entities/distribuition-point.entity';
import { NeedItem } from '../need/entities/needItems.entity';
import { NeedVolunteers } from '../need/entities/needVolunteers.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Shelter, DistribuitionPoints, NeedItem, NeedVolunteers])],
  providers: [SearchService],
  controllers: [SearchController]

})
export class SearchModule {
  

}
