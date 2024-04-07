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

        console.log(`3[StoreService][req][credit]getBalance amount: ${amount}`);
        const balance = await this.getBalance();
        console.log(`3[StoreService][res][credit]getBalance balance: ${JSON.stringify(balance)}`);

        var balanceEntity = new BalanceEntity({ amount: balance.amount + amount});

        console.log(`3[StoreService][req][credit]updateBalance balanceEntity: ${JSON.stringify(balanceEntity)}`);
        await BaasRepository.updateBalance({ balance: balanceEntity });
        console.log(`3[StoreService][res][credit]updateBalance`);
    }

    static async debit({ amount }: { amount: number }): Promise<void> {
        console.log(`3[StoreService][req][debit]getBalance amount: ${amount}`);
        const balance = await this.getBalance();
        console.log(`3[StoreService][res][debit]getBalance amount: ${amount}`);

        var balanceEntity = new BalanceEntity({ amount: balance.amount - amount });

        console.log(`3[StoreService][req][debit]updateBalance balance: ${JSON.stringify(balanceEntity)}`);
        await BaasRepository.updateBalance({ balance: balanceEntity });
        console.log(`3[StoreService][res][debit]updateBalance`);
    }
}