import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { ExceptionsHandler } from '../../core/exceptions/exceptions-handler';
import { AuthService } from './auth.service';
import { LoginOutput } from './dto/login.output';
import { LocalAuthGuard } from 'src/guards/local-auth/local-auth.guard';
import { JwtAuthGuard } from '../../guards/jwt-auth/jwt-auth.guard';
import { LoginInput } from './dto/login.input';
import { ApiResponse, ApiBody, ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@Controller('auth')
@ApiTags('Auth')
export class AuthController extends ExceptionsHandler {
  constructor(private readonly authService: AuthService) {
    super();
  }

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  @ApiBody({ type: LoginInput })
  @ApiResponse({ status: 200, type: LoginOutput })
  async login(@Request() req: any): Promise<LoginOutput | undefined> {
    try {
      return await this.authService.login(req.user);
    } catch (error) {
      this.handleError(error);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('/logout')
  @ApiBearerAuth()
  @ApiResponse({ status: 200 })
  async logout(@Request() req: any): Promise<boolean | undefined> {
    try {
      return await this.authService.logout(req.user);
    } catch (error) {
      this.handleError(error);
    }
  }
}
