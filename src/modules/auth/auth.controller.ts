import {
  Controller,
  Post,
  Body,
  Param,
  Delete,
  Get,
  Patch,
  Request,
  UseGuards,
  Put
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/auth.dto';
import { HttpStatus } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { LoginDto } from './dto/login.dto';
import { ApiBearerAuth, ApiExcludeEndpoint, ApiTags } from '@nestjs/swagger';
import { MailService } from '../mail/mail.service';
import { ChangePasswordDto } from './dto/changepassword.dto';
import { ResetPasswordDto } from './dto/resetpassword.dto';

@ApiTags("Auth")
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService, private mailService: MailService) { }

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    const registeredUser = await this.authService.register(createUserDto);
    return registeredUser;
  }

  @Get('/me')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  async getProfile(@Request() req: any) {
    const user = await this.authService.getProfile(req.user.id);
    return { status: HttpStatus.OK, data: user };
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Patch('update/:userId')
  async update(
    @Request() req: any,
    @Body() updates: CreateUserDto,
  ) {
    return this.authService.updateAccount(req.user.id, updates);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Delete('delete/:userId')
  async delete(
    @Request() req: any
  ) {
    return this.authService.deleteAccount(req.user.id);
  }

  @Post('login')
  async login(
    @Body() loginDto: LoginDto
  ) {
    return this.authService.authenticate(loginDto.email, loginDto.password);
  }

  @ApiExcludeEndpoint()
  @Put('reset-password')
  async resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
    return this.authService.resetPassword(resetPasswordDto);
  }
  @ApiExcludeEndpoint()
  @Put('activate/:activationCode')
  async activateUser(@Param('activationCode') activationCode: string) {
    return this.authService.activateUser(activationCode);
  }
  @Put('change-password')
  async changePassword(@Body() changePasswordDto: ChangePasswordDto) {
    return this.authService.changePassword(changePasswordDto);
  }

  @Get('nearby-users/:userId')
  async findNearbyUsers(@Param('userId') userId: string) {
    const nearbyUsers = await this.authService.findNearbyUsers(userId, 20);
    return nearbyUsers;
  }
}
