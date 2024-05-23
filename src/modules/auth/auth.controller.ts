import { Controller, Post, Body, Put, Param, Delete} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}


  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    const registeredUser = await this.authService.register(createUserDto);
    // await this.authService.sendConfirmationEmail(registeredUser);
    return registeredUser;
  }

  @Put('update/:userId')
  async update(@Param('userId') userId: string, @Body() updates: CreateUserDto) {
    return this.authService.updateAccount(userId, updates);
  }

  @Delete('delete/:userId')
  async delete(@Param('userId') userId: string, @Body('password') password: string) {
    return this.authService.deleteAccount(userId, password);
  }

  @Post('login')
  async login(@Body('email') email: string, @Body('password') password: string) {
    return this.authService.authenticate(email, password);
  }
}