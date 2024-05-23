import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/auth.enity';
import { hash, compare } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async register(user: User) {
    user.roles = [];
    if (user.isDonor) {
      user.roles.push('donor');
    }
    if (user.isCoordinator) {
      user.roles.push('coordinator');
    }
    if (user.isDonor && user.isCoordinator) {
      user.roles = ['both'];
    }

    user.password = await hash(user.password, 10);

    const newUser = await this.usersRepository.save(user);

    delete newUser.password;

    return newUser;
  }

  
/*
  async sendConfirmationEmail(user: User) {
    
  }
*/
async authenticate(email: string, password: string) {
  const user = await this.usersRepository.findOne({ where: { email } });

  if (!user) {
    throw new Error('Usuário não encontrado');
  }
  const passwordMatches = await compare(password, user.password);

  if (!passwordMatches) {
    throw new Error('Senha inválida');
  }
  delete user.password;

  return user;
}
}