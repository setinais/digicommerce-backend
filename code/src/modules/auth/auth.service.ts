import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { EnvironmentModule } from '../environment/environment.module';
import { IPayload } from './dto/IPayload';
import { UsersService } from '../users/users.service';
import { User } from '../users/entities/user.entity';

const { JWT_TOKEN_EXPIRE_IN_SEC } = EnvironmentModule.env;

@Injectable()
export class AuthService {
  constructor(private readonly userService: UsersService, private readonly jwtService: JwtService) {}

  async validateToken(email: string, password_: string): Promise<any> {
    const user = await this.userService.findOne(email);

    if (!user) return null;
    if (!this.validadeSecret(user.password, password_)) return null;
    if (!user.status) return null;

    const { password, ...result } = user;
    return result;
  }

  async validateJwt(payload: IPayload): Promise<any> {
    const user = await this.userService.findOne(payload.id);

    if (!user) return null;
    if (!this.validateExpired(new Date(payload.exp * 1000))) return null;
    if (!user.status) return null;

    const { password, ...result } = user;
    return result;
  }

  async login(user: User): Promise<any> {
    const payload = { id: user.id };

    const expiration = new Date();
    expiration.setSeconds(expiration.getSeconds() + JWT_TOKEN_EXPIRE_IN_SEC);

    const access_token = this.jwtService.sign(payload);

    // Implementar logica para tratar a existencia do token; Ex: DB Redis

    return { token: access_token, expiration: expiration.getTime() };
  }

  async logout({ id: id }): Promise<boolean> {
    const user = await this.userService.findOne(id);

    if (!user.status) throw new UnauthorizedException();

    // Implementar logica para tratar a existencia do token; Ex: DB Redis

    return true;
  }

  private validateExpired(expiration: Date): boolean {
    return expiration.getTime() >= new Date().getTime();
  }

  private validadeSecret(secretToken: string, secretKey: string): boolean {
    return secretToken === secretKey;
  }
}
