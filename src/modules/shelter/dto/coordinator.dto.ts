import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsString } from 'class-validator';
import { CoordinationActionType } from '../enums/shelter.enum';

export class ShelterCoordinatorDto {
  @ApiProperty()
  @IsString()
  @IsEnum(CoordinationActionType)
  action: CoordinationActionType;

  @ApiProperty()
  @IsString()
  coordinatorId: string;
}
