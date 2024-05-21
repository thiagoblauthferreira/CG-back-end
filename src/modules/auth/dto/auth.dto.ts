import { IsEmail, IsString, MinLength, IsBoolean, IsDate, IsOptional, IsEmpty } from 'class-validator';
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';

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
  @MinLength(8)
  password: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  address: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  phone: string;

  @ApiProperty()
  @IsDate()
  @IsOptional()
  birthDate: Date;

  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  isDonor: boolean;

  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  isVolunteer: boolean;
}