import { BalanceEntity } from "../entities/balance_entity";
import { BalanceModel } from "../models/balance_model";
import BaasRepository from "../repositories/baas_repository";
export default class BaasService {
    
    static async getBalance(): Promise<BalanceModel> {
        return BaasRepository.getBalance();
    }

    static async credit({amount}:{amount: number}): Promise<void> {

        const balance = await this.getBalance();

        const balanceEntity = new BalanceEntity({
            amount: balance.amount - amount
        });

        await BaasRepository.updateBalance({balance: balanceEntity});
    }

    static async debit({amount}:{amount: number}): Promise<void> {

        const balance = await this.getBalance();

        const balanceEntity = new BalanceEntity({
            amount: balance.amount - amount
        });

        await BaasRepository.updateBalance({balance: balanceEntity});
    }
}