import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { CoordinationActionType } from '../enums/shelter.enum';
import { QueryRequest } from 'src/common/dto/query';

export class ShelterCoordinatorDto {
  @ApiProperty()
  @IsString()
  @IsEnum(CoordinationActionType)
  action: CoordinationActionType;

  @ApiProperty()
  @IsString()
  coordinatorId: string;
}


export class SearchCoordinatorDto extends QueryRequest {
  @ApiProperty()
  @IsOptional()
  @IsString()
  search: string;
}
