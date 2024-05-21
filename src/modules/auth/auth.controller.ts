import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from './entities/auth.enity';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Body() user: User) {
    const registeredUser = await this.authService.register(user);
    // await this.authService.sendConfirmationEmail(registeredUser);
    return registeredUser;
  }

  @Post('login')
  async login(@Body('email') email: string, @Body('password') password: string) {
    return this.authService.authenticate(email, password);
  }
}