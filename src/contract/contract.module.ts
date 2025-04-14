import { Module } from '@nestjs/common';
import { ContractController } from './contract.controller';
import { ContractService } from './contract.service';
import { SailscallsService } from 'src/sailscallsService/sailscalls.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [ContractController],
  providers: [ContractService, SailscallsService, JwtService]
})
export class ContractModule {}
