import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from '../auth.service';
import { JwtPayload } from '../payload/jwt.payload';
<<<<<<< HEAD
import { CompanyService } from 'src/modules/company/company.service';
=======
import { EnvConfig } from 'src/config';
>>>>>>> 5894575a19bb60d14e0f92fccb3c5c9818ba3454

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly authService: AuthService,
    private readonly companyService: CompanyService
  
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: EnvConfig.JWT_SECRET,
    });
  }

  async validate(payload: JwtPayload) {
    //tiver que por a autenticação da empresa aqui também.
    
    const company = await this.companyService.validateCompany(payload)
     if(company){
       return company;
    }
    const user = await this.authService.validateUser(payload);
    if(user){
      return user;
    }  

    throw new UnauthorizedException();
    
  }
}