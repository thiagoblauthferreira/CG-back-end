import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from './entities/auth.enity';
import { Address } from './entities/adress.enity';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

@Module({
  imports: [TypeOrmModule.forFeature([User, Address])], // Adicione Address aqui
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}