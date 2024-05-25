import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Shelter } from './entities/shelter.entity';
import { ShelterController } from './shelter.controller';
import { ShelterService } from './shelter.service';

@Module({
  imports: [TypeOrmModule.forFeature([Shelter])],
  providers: [ShelterService],
  controllers: [ShelterController],
})
export class ShelterModule {}
