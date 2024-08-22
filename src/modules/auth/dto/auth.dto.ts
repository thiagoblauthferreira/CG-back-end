import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { IsArray, IsBoolean, IsDateString, IsEmail, IsEmpty, IsEnum, IsIn, IsOptional, IsString, MinLength } from 'class-validator';
import { CreateAddressDto } from './adress.dto';
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
  @IsOptional()
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
  birthDate: Date;
  
  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  isCoordinator: boolean;

  @ApiProperty()
  @IsArray()
  @IsOptional()
  @IsIn(['coordinator', 'user', 'admin'], { each: true })
  roles: string[];

  @ApiProperty({ nullable: true })
  @IsBoolean()
  @IsOptional()
  hasVehicle: boolean;

  @ApiProperty({ nullable: true })
  @IsString()
  @IsOptional()
  vehicleType: string;

  @ApiProperty({ nullable: true })
  @IsString()
  @IsOptional()
  color: string;

  @ApiProperty({ nullable: true })
  @IsString()
  @IsOptional()
  identifier: string;

  @ApiProperty({ nullable: true })
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

