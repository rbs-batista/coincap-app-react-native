import { BalanceEntity } from "../entities/balance_entity";
import { BalanceModel } from "../models/balance_model";
import BaasRepository from "../repositories/baas_repository";
export default class BaasService {

    static async getBalance(): Promise<BalanceModel> {
        console.log(`3[BaasService][req][getBalance]getBalance`);
        const balance = await BaasRepository.getBalance();
        console.log(`3[BaasService][res][getBalance]getBalance: ${JSON.stringify(balance)}`);
        return balance
    }

    static async credit({ amount }: { amount: number }): Promise<void> {

        const balance = await this.getBalance();

        var balanceEntity = new BalanceEntity({ amount: amount });

        balanceEntity.amount = balance.amount + amount;

        await BaasRepository.updateBalance({ balance: balanceEntity });
    }

    static async debit({ amount }: { amount: number }): Promise<void> {

        const balance = await this.getBalance();
        var balanceEntity = new BalanceEntity({ amount: amount });

        balanceEntity.amount = balance.amount - amount;
        console.log(`3[StoreService][res][debit]getBalance ${JSON.stringify(balanceEntity)}`);
        await BaasRepository.updateBalance({ balance: balanceEntity });
    }
}