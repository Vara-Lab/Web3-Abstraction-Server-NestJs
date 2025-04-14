import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { KeyringModule } from './keyring/keyring.module';
import { ConfigModule } from '@nestjs/config';
import { SailscallsService } from './sailscallsService/sailscalls.service';
import { ContractModule } from './contract/contract.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    KeyringModule, 
    ContractModule
  ],
  controllers: [AppController],
  providers: [AppService, SailscallsService],
})
export class AppModule {}
