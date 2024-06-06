import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { CoordinationActionType } from '../enums/shelter.enum';

export class ShelterCoordinatorDto {
  @ApiProperty()
  @IsString()
  action: CoordinationActionType;

  @ApiProperty()
  @IsString()
  coordinatorId: string;
}
