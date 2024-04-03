import { BalanceEntity } from "../entities/balance_entity";
import StorageAdapter from "../infrastructure/adapter/storage_adapter";
import { BalanceModel } from "../models/balance_model";
export default class BaasRepository {
    private static key: string = '@baas_key';
    private static adapter = new StorageAdapter(this.key);

    static async getBalance(): Promise<BalanceModel> {
        console.log(`4[BaasRepository][req][getBalance]all`);
        const res = await this.adapter.all();
        console.log(`4[BaasRepository][res][getBalance]all: ${JSON.stringify(res)}`);

        const amount = res == null ? 1000.10 : res.amount;
       
        const balance = new BalanceModel({amount: amount});
        console.log(`4[BaasRepository][res][getBalance]all: ${JSON.stringify(balance)}`);
        return balance;
    }

    static async updateBalance({balance}: {balance: BalanceEntity}): Promise<void> {

        await this.adapter.updateAll({balance: balance});
    }
}