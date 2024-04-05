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
        const balance = new BalanceModel({ amount: res.amount });
        return balance;
    }

    static async updateBalance({ balance }: { balance: BalanceEntity }): Promise<void> {
        console.log(`4[BaasRepository][req][updateBalance]updateAll: balance= ${JSON.stringify((balance))}`);
        await this.adapter.updateAll({ balance: balance });
    }
}