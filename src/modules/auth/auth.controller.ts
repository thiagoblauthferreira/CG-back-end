import {
  Controller,
  Post,
  Body,
  Param,
  Delete,
  Get,
  Patch,
  Request,
  UseGuards
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/auth.dto';
import { HttpStatus } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { LoginDto } from './dto/login.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags("Auth")
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    const registeredUser = await this.authService.register(createUserDto);
    // await this.authService.sendConfirmationEmail(registeredUser);
    return registeredUser;
  }

  @Get('/me')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  async getProfile(@Request() req) {
    const user = await this.authService.getProfile(req.user.sub);
    return { status: HttpStatus.OK, data: user };
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Patch('update/:userId')
  async update(
    @Param('userId') userId: string,
    @Body() updates: CreateUserDto,
  ) {
    return this.authService.updateAccount(userId, updates);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Delete('delete/:userId')
  async delete(
    @Param('userId') userId: string,
    @Body('password') password: string,
  ) {
    return this.authService.deleteAccount(userId, password);
  }

  @Post('login')
  async login(
    @Body() loginDto: LoginDto
  ) {
    return this.authService.authenticate(loginDto.email, loginDto.password);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Get('nearby-users/:userId')
  async findNearbyUsers(@Param('userId') userId: string) {
    const nearbyUsers = await this.authService.findNearbyUsers(userId, 20);
    return nearbyUsers;
  }
}
