import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CurrentToken } from 'src/core/decorators/CurrentTokenGql.decorator';
import { ExceptionsHandler } from 'src/core/exceptions/exceptions-handler';
import { GqlAuthGuard } from '../../guards/gql-auth/gql-auth.guard';
import { AuthService } from './auth.service';
import { LoginInput } from './dto/login.input';
import { LoginOutput } from './dto/login.output';
import { LocalStrategy } from './local.strategy';
import { User } from '../users/entities/user.entity';

@Resolver()
export class AuthResolver extends ExceptionsHandler {
  constructor(private readonly authService: AuthService, private readonly localStrategy: LocalStrategy) {
    super();
  }

  @Mutation(() => LoginOutput)
  async login(@Args('loginInput') loginInput: LoginInput): Promise<LoginOutput> {
    try {
      return await this.authService.login(await this.localStrategy.validate(loginInput.idKey, loginInput.secretKey));
    } catch (error) {
      this.handleError(error);
    }
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Boolean)
  async logout(@CurrentToken() user: User): Promise<boolean> {
    try {
      await this.authService.logout(user);
      return true;
    } catch (error) {
      this.handleError(error);
    }
  }
}
