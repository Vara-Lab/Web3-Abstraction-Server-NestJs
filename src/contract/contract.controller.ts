import { Body, Controller, Delete, Get, Param, Post,  Put,  UseGuards } from '@nestjs/common';
import { ContractService } from './contract.service';
import { JwtGuard } from 'src/auth/guards/jwt.guard';

@Controller('contract')
export class ContractController {
    constructor(private contractService: ContractService) {}

    @UseGuards(JwtGuard)
    @Post('command/green')
    async green(@Body() data: any) {
        this.contractService.greenCall(data.user.sub);
    }

    @UseGuards(JwtGuard)
    @Post('command/yellow')
    async yellow(@Body() data: any) {
        this.contractService.yellowCall(data.user.sub);
    }

    @UseGuards(JwtGuard)
    @Post('command/red')
    async red(@Body() data: any) {
        this.contractService.redCall(data.user.sub);
    }

    @Get('command/state')
    async state() {
        this.contractService.trafficLightState();
    }
}
