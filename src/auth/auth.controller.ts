import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
// import { CreateUserDto } from 'src/user/dto/dto/user.dto';
import { CreateKeyringDto } from 'src/keyring/dto/create-keyring.dto';
import { LoginDto } from './dto/auth.dto';
import { AuthService } from './auth.service';
import { RefreshJwtGuard } from './guards/refresh.guard';
import { KeyringService } from 'src/keyring/keyring.service';

@Controller('auth')
export class AuthController {
  constructor(
    private keyringService: KeyringService,
    private authService: AuthService,
  ) {}

  @Post('register')
  async registerUser(@Body() dto: CreateKeyringDto) {
    return await this.keyringService.createKeyring(dto);
  }

  @Post('login')
  async login(@Body() dto: LoginDto) {
    return await this.authService.login(dto);
  }

  @UseGuards(RefreshJwtGuard)
  @Post('refresh')
  async refreshToken(@Request() req) {
    console.log('refreshed');

    return await this.authService.refreshToken(req.user);
  }
}
