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
  @ApiPropertyOptional({ description: 'Status: LOW, AVERAGE, HIGH, URGENT AND MEDICATION' })
  readonly status?: Status;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({ description: 'Priority: CREATED, PENDING, IN_PROGRESS, PARTIALLY_COMPLETED AND COMPLETED ' })
  readonly priority?: Priority;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({ description: 'Neighborhood' })
  readonly neighborhood?: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({ description: 'Street' })
  readonly street?: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({ description: 'City' })
  readonly city?: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({ description: 'State' })
  readonly state?: string;

  }

