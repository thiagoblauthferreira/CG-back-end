import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Status, User } from './entities/auth.enity';
import { hash, compare, genSalt } from 'bcrypt';
import { Address } from './entities/adress.enity';
import { CreateUserDto } from './dto/auth.dto';
import * as opencage from 'opencage-api-client';
import { HttpException, HttpStatus } from '@nestjs/common';
import { EnvConfig } from 'src/config';
import { JwtPayload } from './payload/jwt.payload';
import { JwtService } from '@nestjs/jwt';
import logger from 'src/logger';
import { CompanyService } from '../company/company.service';
// import { MailService } from '../mail/mail.service';
import { SendMailActivationUserDto } from '../mail/dto/sendmailactivationuser.dto';
import { ResetPasswordDto } from './dto/resetpassword.dto';
import { SendMailResetPasswordDto } from '../mail/dto/sendmailresetpassword.dto';
import { ChangePasswordDto } from './dto/changepassword.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Address)
    private addressRepository: Repository<Address>,
    private jwtService: JwtService,
    private companyService: CompanyService,
    // private mailService: MailService,
  ) {}

  async validateUser(payload: JwtPayload) {
    const user = await this.usersRepository.findOne({
      where: { id: payload.sub },
    });

    if (!user || user.username !== payload.username) {
      throw new UnauthorizedException();
    }
    return user;
  }

  public async getProfile(userId: string) {
    const user = await this.usersRepository.findOne({
      where: { id: userId },
      relations: ['address'],
    });

    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    // Remover a senha do objeto do usuário antes de retorná-lo
    const result = { ...user };
    delete result.password;
    return result;
  }

  public async register(createUserDto: CreateUserDto) {
    try {
      const existingUser = await this.usersRepository.findOne({
        where: [
          { username: createUserDto.username },
          { email: createUserDto.email },
        ],
      });

      if (existingUser) {
        throw new ConflictException('Nome de usuário ou Email já está em uso');
      }

      const user = new User();
      Object.assign(user, createUserDto);

      const salt = await genSalt();

      user.password = await hash(createUserDto.password, salt);

      const address = new Address();
      Object.assign(address, createUserDto.address);
      const newAddress = await this.addressRepository.save(address);

      user.roles = [];

      if (user.isCoordinator) {
        user.roles.push('coordinator');
      } else {
        user.roles = ['user'];
      }
      const addressString = `${newAddress.logradouro}, ${newAddress.numero}, ${newAddress.bairro}, ${newAddress.municipio}, ${newAddress.estado}, ${newAddress.pais}`;
      const geocodeResult = await opencage.geocode({
        q: addressString,
        key: EnvConfig.OPENCAGE.API_KEY,
      });

      if (geocodeResult.results.length > 0) {
        const { lat, lng } = geocodeResult.results[0].geometry;
        newAddress.latitude = lat;
        newAddress.longitude = lng;
      }

      const updatedAddress = await this.addressRepository.save(newAddress);

      user.address = updatedAddress;
      user.address = newAddress;
      user.code = generateRandomCode(6);

      const newUser = await this.usersRepository.save(user);

      const mailDto = new SendMailActivationUserDto(
        newUser.name,
        newUser.email,
        newUser.code,
      );

      // this.mailService.sendUserConfirmation(mailDto)

      const payload = {
        username: newUser.username,
        sub: newUser.id,
        roles: newUser.roles,
      };
      const token = this.jwtService.sign(payload);

      return { token };
    } catch (error) {
      logger.error(error);
      throw error;
    }
  }

  public async resetPassword(dto: ResetPasswordDto) {
    try {
      const user = await this.usersRepository.findOne({
        where: { email: dto.email.toLowerCase() },
      });

      if (!user) {
        throw new NotFoundException('Usuário não encontrado');
      }

      const newPassword = generateRandomCode(8);
      user.password = await hash(newPassword, 10);

      await this.usersRepository.save(user);

      const mailDto = new SendMailResetPasswordDto(
        user.name,
        newPassword,
        user.email,
      );

      // this.mailService.sendResetPassword(mailDto);

      return { message: 'Senha redefinida com sucesso', newPassword };
    } catch (error) {
      logger.error(error);
      throw new HttpException(
        'Error on reset password',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  public async activateUser(code: string) {
    try {
      const user = await this.usersRepository.findOne({
        where: { code: code },
      });

      if (!user) {
        throw new NotFoundException('Usuário não encontrado');
      }

      if (user.code !== code) {
        throw new NotFoundException('Código de ativação inválido');
      }

      user.status = Status.APPROVED;

      await this.usersRepository.save(user);

      return { message: 'Usuário ativado com sucesso' };
    } catch (error) {
      logger.error(error);
      throw new HttpException(
        'Error on activate user',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  public async changePassword(dto: ChangePasswordDto) {
    try {
      const user = await this.usersRepository.findOne({
        where: { email: dto.email.toLowerCase() },
      });

      if (!user) {
        throw new NotFoundException('Usuário não encontrado');
      }
      debugger;

      const passwordMatches = await compare(dto.oldPassword, user.password);

      if (!passwordMatches) {
        throw new NotFoundException('Senha inválida');
      }

      user.password = await hash(dto.newPassword, 10);

      await this.usersRepository.save(user);

      // this.mailService.sendChangePasswordAlert(user.email, user.name);
      return { message: 'Senha alterada com sucesso' };
    } catch (error) {
      logger.error(error);
      throw new HttpException(
        'Error on change password',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  public async deleteAccount(userId: string) {
    const user = await this.usersRepository.findOne({ where: { id: userId } });

    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    await this.usersRepository.delete(userId);

    return { message: 'Conta deletada com sucesso' };
  }

  public async updateAccount(userId: string, updates: Partial<User>) {
    const user = await this.usersRepository.findOne({ where: { id: userId } });

    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    if (updates.password) {
      updates.password = await hash(updates.password, 10);
    }

    /**
     * Se o usuário tentar alterar o email, podemos ter emails
     * repetidos no banco, é bom adicionar uma lógica pra
     * impedir isso ou só impedir que essa rota seja usada pra
     * isso, criando uma outra so pro email
     */

    const updatedUser = await this.usersRepository.save({
      ...user,
      ...updates,
    });

    delete updatedUser.password;

    return updatedUser;
  }

  public async authenticate(email: string, password: string) {
    const user = await this.usersRepository.findOne({
      where: { email: email.toLowerCase() },
    });
    //adicionando pesquisa company
    const company = await this.companyService.findByEmail(email);
    //adiciona comparação para validação de e-mail
    if (!user && !company) {
      throw new Error('Usuário não encontrado');
    }
    //Início da lógica do token para a company
    let token = '';
    if (company && !user) {
      const passwordMatchesCompany = await compare(password, company.password);
      if (!passwordMatchesCompany) {
        throw new ForbiddenException('Erro nas credenciais de acesso.');
      }

      const payload = {
        username: company.tradeName,
        sub: company.id,
        roles: ['donor', 'company'],
      };
      token = this.jwtService.sign(payload);
      return { token };
    }
    //fim da lógica do token para a company

    const passwordMatches = await compare(password, user.password);

    if (!passwordMatches) {
      throw new Error('Senha inválida');
    }

    const payload = {
      username: user.username,
      sub: user.id,
      roles: user.roles,
    };
    token = this.jwtService.sign(payload);

    return { token };
  }
  public async findNearbyUsers(userId: string, radius: number) {
    const user = await this.usersRepository.findOne({
      where: { id: userId },
      relations: ['address'],
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const userLatitude = user.address.latitude;
    const userLongitude = user.address.longitude;

    const query = this.usersRepository
      .createQueryBuilder('user')
      .select([
        'user.id',
        'user.name',
        'user.username',
        'user.phone',
        'user.birthDate',
        'user.isCoordinator',
        'user.roles',
        'user.status',
      ]) // Select only the fields you want to return
      .addSelect(['address.latitude', 'address.longitude']) // Select only the fields you want from the address
      .leftJoin('user.address', 'address')
      .where(
        `6371 * acos(cos(radians(:userLatitude)) * cos(radians(address.latitude)) * cos(radians(address.longitude) - radians(:userLongitude)) + sin(radians(:userLatitude)) * sin(radians(address.latitude))) < :radius`,
        {
          userLatitude,
          userLongitude,
          radius,
        },
      )
      .andWhere('user.id != :userId', { userId });

    return await query.getMany();
  }
}

function generateRandomCode(length: number): string {
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  const charactersLength = characters.length;

  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
}
