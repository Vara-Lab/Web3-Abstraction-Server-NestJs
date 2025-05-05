import { HexString } from "@gear-js/api";
import { 
    CONTRACT_ID, 
    IDL, 
    NETWORK, 
    SPONSOR_MNEMONIC, 
    SPONSOR_NAME 
} from "../consts.js";
import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { SailsCalls } from 'sailscalls';


@Injectable()
export class SailscallsService implements OnModuleInit, OnModuleDestroy {
    private sailsCalls: SailsCalls;

    sailsInstance() {
        return this.sailsCalls;
    }

    command() {
        return this.sailsCalls.command;
    }

    query() {
        return this.sailsCalls.query;
    }

    async checkVoucher(userAddress: HexString, voucherId: HexString) {
        const voucherIsExpired = await this.sailsCalls.voucherIsExpired(
            userAddress,
            voucherId,
        );

        if (voucherIsExpired) {
            await this.sailsCalls.renewVoucherAmountOfBlocks({
                userAddress,
                voucherId,
                numOfBlocks: 1200, // 1200 blocks = 1 hour
            })
        }

        const voucherBalance = await this.sailsCalls.voucherBalance(voucherId);

        if (voucherBalance < 1) {
            await this.sailsCalls.addTokensToVoucher({
                userAddress,
                voucherId,
                numOfTokens: 1
            });
        }
    }

    async onModuleInit() {
        this.sailsCalls = await SailsCalls.new({
            network: NETWORK,
            voucherSignerData: {
                sponsorMnemonic: SPONSOR_MNEMONIC,
                sponsorName: SPONSOR_NAME
            },
            newContractsData: [
                {
                    contractName: 'traffic_light',
                    address: CONTRACT_ID,
                    idl: IDL
                }
            ]
        });

        console.log('Sailscalls service has been initialized.');
    }

    async onModuleDestroy() {
        await this.sailsCalls.disconnectGearApi();
        console.log('Sailscalls service has been destroyed.');
    }
}
