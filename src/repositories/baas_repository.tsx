import { BalanceEntity } from "../entities/balance_entity";
import StorageAdapter from "../infrastructure/adapter/storage_adapter";
import { BalanceModel } from "../models/balance_model";
export default class BaasRepository {
    private static key: string = '@baas_key';
    private static adapter = new StorageAdapter(this.key);

    static async getBalance(): Promise<BalanceModel> {
        
        const res = await this.adapter.all();
        const amount = res != null ? res.amount : 0.00; 
        const balance = new BalanceModel({ amount: amount});
        return balance;
    }

    static async updateBalance({ balance }: { balance: BalanceEntity }): Promise<void> {
        
        await this.adapter.update({ updateData: balance });
        
    }
}