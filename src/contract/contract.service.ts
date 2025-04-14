import { Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { SailscallsService } from 'src/sailscallsService/sailscalls.service';
import { KeyringData } from 'src/keyring/dto/keyring.dto';
import type { KeyringPair } from '@polkadot/keyring/types';

@Injectable()
export class ContractService {
    constructor(private sailsCallsService: SailscallsService) {}

    async greenCall(signerData: KeyringData) {
        const sailscallsInstance = this.sailsCallsService.sailsInstance();

        try {
            await this.sailsCallsService.checkVoucher(
                signerData.keyringAddress,
                signerData.keyringVoucherId
            );
        } catch (e) {
            throw new UnauthorizedException('Voucher is not set for user');
        }

        let signer: KeyringPair;

        try {
            signer = sailscallsInstance.unlockKeyringPair(
                signerData.lockedKeyringData, 
                signerData.password
            );
        } catch(e) {
            throw new UnauthorizedException();
        }

        try {
            const response = await sailscallsInstance.command({
                serviceName: 'TrafficLight',
                methodName: 'Green',
                signerData: signer,
                voucherId: signerData.keyringVoucherId,
                callArguments: [
                    signerData.keyringAddress
                ],
            });

            return {
                message: 'green call',
                contractMessage: response
            }
        } catch (e) {
            const error = e as Error;

            throw new InternalServerErrorException({
                message: 'Error sending message',
                sailsCallsError: error.message
            });
        }
    }

    async yellowCall(signerData: KeyringData) {
        const sailscallsInstance = this.sailsCallsService.sailsInstance();

        try {
            await this.sailsCallsService.checkVoucher(
                signerData.keyringAddress,
                signerData.keyringVoucherId
            );
        } catch (e) {
            throw new UnauthorizedException('Voucher is not set for user');
        }

        let signer: KeyringPair;

        try {
            signer = sailscallsInstance.unlockKeyringPair(
                signerData.lockedKeyringData, 
                signerData.password
            );
        } catch(e) {
            throw new UnauthorizedException();
        }

        try {
            const response = await sailscallsInstance.command({
                serviceName: 'TrafficLight',
                methodName: 'Yellow',
                signerData: signer,
                voucherId: signerData.keyringVoucherId,
                callArguments: [
                    signerData.keyringAddress
                ],
            });

            return {
                message: 'yellow call',
                contractMessage: response
            }
        } catch (e) {
            const error = e as Error;

            throw new InternalServerErrorException({
                message: 'Error sending message',
                sailsCallsError: error.message
            });
        }
    }

    async redCall(signerData: KeyringData) {
        const sailscallsInstance = this.sailsCallsService.sailsInstance();

        try {
            await this.sailsCallsService.checkVoucher(
                signerData.keyringAddress,
                signerData.keyringVoucherId
            );
        } catch (e) {
            throw new UnauthorizedException('Voucher is not set for user');
        }

        let signer: KeyringPair;

        try {
            signer = sailscallsInstance.unlockKeyringPair(
                signerData.lockedKeyringData, 
                signerData.password
            );
        } catch(e) {
            throw new UnauthorizedException();
        }

        try {
            const response = await sailscallsInstance.command({
                serviceName: 'TrafficLight',
                methodName: 'Red',
                signerData: signer,
                voucherId: signerData.keyringVoucherId,
                callArguments: [
                    signerData.keyringAddress
                ],
            });

            return {
                message: 'red call',
                contractMessage: response
            }
        } catch (e) {
            const error = e as Error;

            throw new InternalServerErrorException({
                message: 'Error sending message',
                sailsCallsError: error.message
            });
        }
    }

    async trafficLightState() {
        const sailscallsInstance = this.sailsCallsService.sailsInstance();

        try {
            // You need to get the function and then call it with the 
            // arguments (serviceName, methodName), you need to check 
            // the first parenthesis and then the second one
            const response = await this.sailsCallsService.query()({
                serviceName: 'TrafficLight',
                methodName: 'TrafficLight',
            });

            return {
                message: 'green call',
                contractMessage: response
            }
        } catch(e) {
            throw new InternalServerErrorException('Error getting state');
        }
    }
}
