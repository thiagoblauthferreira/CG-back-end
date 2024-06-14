import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class ActivateUserDto {
    @ApiProperty()
    @IsNotEmpty()
    code: string;
};