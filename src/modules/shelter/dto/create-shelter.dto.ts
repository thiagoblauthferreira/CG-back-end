import { ApiHideProperty } from '@nestjs/swagger';
import { IsEmpty } from 'class-validator';

export class CreateShelterDto {
  @ApiHideProperty()
  @IsEmpty()
  id: string;

  @ApiHideProperty()
  @IsEmpty()
  createdAt: Date;

  @ApiHideProperty()
  @IsEmpty()
  updatedAt: Date;

  @ApiHideProperty()
  @IsEmpty()
  deletedAt: Date;
}
