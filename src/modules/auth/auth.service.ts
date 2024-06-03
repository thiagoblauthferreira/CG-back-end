import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/auth.enity';
import { hash, compare } from 'bcrypt';
import { Address } from './entities/adress.enity';
import { CreateUserDto } from './dto/auth.dto';
import * as opencage from 'opencage-api-client';
import { HttpException, HttpStatus } from '@nestjs/common';
import { EnvConfig } from 'src/config';
import { JwtPayload } from './payload/jwt.payload';
import { JwtService } from '@nestjs/jwt';
import logger from 'src/logger';
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Address)
    private addressRepository: Repository<Address>,
    private jwtService: JwtService,
  ) {}


  async validateUser(payload: JwtPayload) {

    const user = await this.usersRepository.findOne({ where: { id: payload.sub } });

    if (!user || user.username !== payload.username) {
      throw new UnauthorizedException();
    }
    return user;
  }

  public async getProfile(userId: string) {
    const user = await this.usersRepository.findOne({ 
        where: { id: userId },
        relations: ['address'] 
    });

    if (!user) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    // Remover a senha do objeto do usuário antes de retorná-lo
    const result = { ...user };
    delete result.password;
    return result;
  }


  public async register(createUserDto: CreateUserDto) {
    try {
      const existingUser = await this.usersRepository.findOne({
        where: [{ username: createUserDto.username }, { email: createUserDto.email }]
      });
      
      if (existingUser) {
        throw new HttpException('Username or email already in use', HttpStatus.CONFLICT);
      }
  
      const user = new User();
      Object.assign(user, createUserDto);
  
      user.password = await hash(createUserDto.password, 10);
  
      const address = new Address();
      Object.assign(address, createUserDto.address);
      const newAddress = await this.addressRepository.save(address);
  
      user.roles = [];
  
      if (user.isDonor) {
          user.roles.push('donor');
      }
      if (user.isCoordinator) {
          user.roles.push('coordinator');
      }
      if (user.isDonor && user.isCoordinator) {
        user.roles = ['user'];
      }
      const addressString = `${newAddress.logradouro}, ${newAddress.numero}, ${newAddress.bairro}, ${newAddress.municipio}, ${newAddress.estado}, ${newAddress.pais}`;
      const geocodeResult = await opencage.geocode({ q: addressString, key: EnvConfig.OPENCAGE.API_KEY });
      
      if (geocodeResult.results.length > 0) {
        const { lat, lng } = geocodeResult.results[0].geometry;
        newAddress.latitude = lat;
        newAddress.longitude = lng;
      }
  
      const updatedAddress = await this.addressRepository.save(newAddress);
  
      user.address = updatedAddress;
      user.address = newAddress;
      
      const newUser = await this.usersRepository.save(user);
  
      const payload = { username: newUser.username, sub: newUser.id, roles: newUser.roles };
      const token = this.jwtService.sign(payload);
  
      return { token };
    } catch (error) {
      logger.error(error);
      throw new HttpException('Error on register user', HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  public async deleteAccount(userId: string, password: string) {
    const user = await this.usersRepository.findOne({ where: { id: userId } });

    if (!user) {
      throw new Error('Usuário não encontrado');
    }

    const passwordMatches = await compare(password, user.password);

    if (!passwordMatches) {
      throw new Error('Senha inválida');
    }

    await this.usersRepository.delete(userId);

    return { message: 'Conta deletada com sucesso' };
  }


  public async updateAccount(userId: string, updates: Partial<User>) {
    const user = await this.usersRepository.findOne({ where: { id: userId } });

    if (!user) {
      throw new Error('Usuário não encontrado');
    }

    if (updates.password) {
      updates.password = await hash(updates.password, 10);
    }

    const updatedUser = await this.usersRepository.save({ ...user, ...updates });

    delete updatedUser.password;

    return updatedUser;
  }
  
/*
  async sendConfirmationEmail(user: User) {
    
  }
*/
public async authenticate(email: string, password: string) {
  const user = await this.usersRepository.findOne({ where: { email: email.toLowerCase() } });

  if (!user) {
    throw new Error('Usuário não encontrado');
  }

  const passwordMatches = await compare(password, user.password);

  if (!passwordMatches) {
    throw new Error('Senha inválida');
  }

  const payload = { username: user.username, sub: user.id, roles: user.roles };
  const token = this.jwtService.sign(payload);

  return { token };
}
  public async findNearbyUsers(userId: string, radius: number) {
    const user = await this.usersRepository.findOne({
      where: { id: userId },
      relations: ["address"]
    });

    if (!user) {
      throw new Error('User not found');
    }

    const userLatitude = user.address.latitude;
    const userLongitude = user.address.longitude;

    const query = this.usersRepository
      .createQueryBuilder("user")
      .select(["user.id", "user.name", "user.username", "user.phone", "user.birthDate", "user.isDonor", "user.isCoordinator", "user.roles", "user.status"]) // Select only the fields you want to return
      .addSelect(["address.latitude", "address.longitude"]) // Select only the fields you want from the address
      .leftJoin("user.address", "address")
      .where(`6371 * acos(cos(radians(:userLatitude)) * cos(radians(address.latitude)) * cos(radians(address.longitude) - radians(:userLongitude)) + sin(radians(:userLatitude)) * sin(radians(address.latitude))) < :radius`, {
        userLatitude,
        userLongitude,
        radius
      })
      .andWhere("user.id != :userId", { userId });

    return await query.getMany();
  }
}