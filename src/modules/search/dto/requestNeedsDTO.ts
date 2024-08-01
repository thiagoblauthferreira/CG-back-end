import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsInt, Min, Max, IsIn } from 'class-validator';
import { Priority } from 'src/modules/need/enums/enumPriority';
import { Status } from 'src/modules/need/enums/enumsStatus';
export class RequestNeedsDTO {
  
  @IsString()
  @IsOptional()
  @ApiPropertyOptional({ description: 'Title' })
  readonly title?: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({ description: 'Status: CREATED, PENDING, IN_PROGRESS, PARTIALLY_COMPLETED AND COMPLETED' })
  readonly status?: Status;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({ description: 'Priority: LOW, AVERAGE, HIGH, URGENT AND MEDICATION' })
  readonly priority?: Priority;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({ description: 'Shelter' })
  readonly shelter?: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({ enum: ['priority', 'status'] })
  readonly sortBy?: 'priority' | 'status'; // String literal para sortBy

  @IsString()
  @IsOptional()
  @IsIn(['ASC', 'DESC'])
  @ApiPropertyOptional({ description: "'DESC' or 'ASC'" })
  readonly sortOrder?: 'ASC' | 'DESC';
  }

