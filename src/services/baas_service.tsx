import { BalanceEntity } from "../entities/balance_entity";
import { BalanceModel } from "../models/balance_model";
import BaasRepository from "../repositories/baas_repository";
export default class BaasService {
    
    static async getBalance(): Promise<BalanceModel | null> {
        return await BaasRepository.getBalance();
    }

    static async credit({amount}:{amount: number}): Promise<void> {

        const balance = await this.getBalance();

        var balanceEntity = new BalanceEntity({amount: amount});

        if(balance != null) {
            balanceEntity.amount = balance.amount + amount;
        }

        await BaasRepository.updateBalance({balance: balanceEntity});
    }

    static async debit({amount}:{amount: number}): Promise<void> {

        const balance = await this.getBalance();

        var balanceEntity = new BalanceEntity({amount: amount});

        if(balance != null) {
            balanceEntity.amount = balance.amount - amount;
        }

        await BaasRepository.updateBalance({balance: balanceEntity});
    }
}