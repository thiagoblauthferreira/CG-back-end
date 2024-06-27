import { IsEmail, IsString, MinLength, IsBoolean, IsOptional, IsEmpty, IsArray, IsIn, IsEnum, IsDateString } from 'class-validator';
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { CreateAddressDto } from './adress.dto';
import { Type } from 'class-transformer';
export enum Status {
  WAITING = 'waiting',
  APPROVED = 'approved',
  REJECTED = 'rejected'
}
export class CreateUserDto {
  @ApiHideProperty()
  @IsEmpty()
  id: string;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  username: string;

  @ApiProperty()
  @IsString()
  @MinLength(8)
  password: string;

  @ApiProperty({ type: () => CreateAddressDto })
  address: CreateAddressDto;

  @ApiProperty()
  @IsString()
  @IsOptional()
  phone: string;

  @ApiProperty()
  @IsDateString()
  @IsOptional()
  @Type(() => Date) // retirar depois
  birthDate: Date;

  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  isDonor: boolean;

  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  isCoordinator: boolean;

  @ApiProperty()
  @IsArray()
  @IsOptional()
  @IsIn(['donor', 'coordinator', 'user', 'admin'], { each: true })
  roles: string[];

  @ApiProperty({nullable: true})
  @IsBoolean()
  @IsOptional()
  hasVehicle: boolean;

  @ApiProperty({nullable: true})
  @IsString()
  @IsOptional()
  vehicleType: string;

  @ApiProperty({nullable: true})
  @IsString()
  @IsOptional()
  color: string;

  @ApiProperty({nullable: true})
  @IsString()
  @IsOptional()
  identifier: string;

  @ApiProperty({nullable: true})
  @IsString()
  @IsOptional()
  brand: string;

  @ApiProperty({ enum: Status, default: Status.WAITING })
  @IsEnum(Status)
  @IsOptional()
  status: Status;

  @ApiHideProperty()
  @IsOptional()
  code: string;
}

