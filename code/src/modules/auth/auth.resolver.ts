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
import { UsersService } from '../users/users.service';
import { ApiKeyAuthGuard } from 'src/guards/api-key-auth/api-key-auth.guard';
import { LoginApiInput } from './dto/login.api.input';

@Resolver()
export class AuthResolver extends ExceptionsHandler {
  constructor(
    private readonly authService: AuthService,
    private readonly localStrategy: LocalStrategy,
    private readonly userService: UsersService,
  ) {
    super();
  }

  @Mutation(() => LoginOutput)
  async login(
    @Args('loginInput') loginInput: LoginInput,
  ): Promise<LoginOutput | undefined> {
    try {
      return await this.authService.login(
        await this.localStrategy.validate(
          loginInput.idKey,
          loginInput.secretKey,
        ),
      );
    } catch (error) {
      this.handleError(error);
    }
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Boolean)
  async logout(@CurrentToken() user: User): Promise<boolean | undefined> {
    try {
      await this.authService.logout(user);
      return true;
    } catch (error) {
      this.handleError(error);
    }
  }

  @UseGuards(ApiKeyAuthGuard)
  @Mutation(() => LoginOutput)
  async loginApis(
    @Args('loginInput') loginInput: LoginApiInput,
  ): Promise<LoginOutput | undefined> {
    try {
      let user = await this.userService.findByEmail(loginInput.email);
      if (!user) {
        user = await this.userService.create({
          email: loginInput.email,
          name: loginInput.name,
          password: Math.random().toString(36).slice(-10),
        });
      }
      return await this.authService.login(user);
    } catch (error) {
      this.handleError(error);
    }
  }
}
