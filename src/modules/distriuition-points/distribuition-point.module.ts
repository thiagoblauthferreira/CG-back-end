import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DistribuitionPoints } from './entities/distribuition-point.entity';
import { DistribuitionPointsService } from './distribuition-point.service';
import { DistribuitionPointsController } from './distribuition-point.controller';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([DistribuitionPoints]),
    forwardRef(() => AuthModule),
  ],
  providers: [DistribuitionPointsService],
  controllers: [DistribuitionPointsController],
  exports: [TypeOrmModule, DistribuitionPointsService],
})
export class DistribuitionPointsModule {}
