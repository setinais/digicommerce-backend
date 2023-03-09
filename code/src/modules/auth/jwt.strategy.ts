import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { EnvironmentModule } from '../environment/environment.module';
import { AuthService } from './auth.service';

const { API_KEY } = EnvironmentModule.env;

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: API_KEY,
    });
  }

  async validate(payload: any) {
    const token = await this.authService.validateJwt(payload);
    if (!token) {
      throw new UnauthorizedException();
    }
    return token;
  }
}
