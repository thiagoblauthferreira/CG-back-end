import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Shelter } from './entities/shelter.entity';
import { ShelterController } from './shelter.controller';
import { ShelterService } from './shelter.service';
import { Address } from '../auth/entities/adress.enity';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Shelter, Address]),
    forwardRef(() => AuthModule),
  ],
  providers: [ShelterService],
  controllers: [ShelterController],
  exports: [TypeOrmModule, ShelterService],
})
export class ShelterModule {}
