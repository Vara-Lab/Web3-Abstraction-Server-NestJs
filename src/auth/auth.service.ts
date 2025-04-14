import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './dto/auth.dto';
import { KeyringService } from 'src/keyring/keyring.service';
import { JwtService } from '@nestjs/jwt';

const EXPIRE_TIME = 20 * 1000;

@Injectable()
export class AuthService {
  constructor(
    private keyringService: KeyringService,
    private jwtService: JwtService,
  ) {}

  async login(dto: LoginDto) {
    console.log(dto);
    const keyringSessionData = await this.validateUser(dto);
    const payload = {
      username: keyringSessionData.username,
      sub: {
        keyringAddress: keyringSessionData.keyringAddress,
        keyringVoucherId: keyringSessionData.keyringVoucherId,
        lockedKeyringData: keyringSessionData.lockedKeyringData,
        password: keyringSessionData.password
      },
    };

    return {
      user: {
        name: keyringSessionData.username,
        id: keyringSessionData.keyringAddress,
      },
      backendTokens: {
        accessToken: await this.jwtService.signAsync(payload, {
          expiresIn:'7d',
          secret: process.env.jwtSecretKey,
        }),
        refreshToken: await this.jwtService.signAsync(payload, {
          expiresIn: '7d',
          secret: process.env.jwtRefreshTokenKey,
        }),
        expiresIn: new Date().setTime(new Date().getTime() + EXPIRE_TIME),
      },
    };
  }

  async validateUser(dto: LoginDto) {
    const { username, password } = dto;
    console.log('Se checara el keyring');
    const keyringAddress = await this.keyringService.userKeyringAddress(username);
    console.log('Se checo el keyring');
    if (!keyringAddress) {
      throw new UnauthorizedException();
    }

    console.log('Consiguiendo datos de la sesion');
    const keyringSessionData = await this.keyringService.userKeyringData(
      keyringAddress,
      username,
      password
    );

    console.log('Se consiguieron los datos de la sesion');

    return keyringSessionData;
  }

  async refreshToken(user: any) {
    const payload = {
      username: user.username,
      sub: user.sub
    };

    return {
      accessToken: await this.jwtService.signAsync(payload, {
        expiresIn: '20s',
        secret: process.env.jwtSecretKey,
      }),
      refreshToken: await this.jwtService.signAsync(payload, {
        expiresIn: '7d',
        secret: process.env.jwtRefreshTokenKey,
      }),
      expiresIn: new Date().setTime(new Date().getTime() + EXPIRE_TIME),
    };
  }
}
