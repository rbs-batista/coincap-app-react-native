import StorageAdapter from "../infrastructure/adapter/storage_adapter";
export default class BaasRepository {
    private static key: string = '@baas_key';
    private static adapter = new StorageAdapter(this.key);

    static async getBalance() {
        try {
            return await this.adapter.all();
        } catch (err) {
            throw(err);
        }
    }

    static async updateBalance({amount}: {amount: number}) {
        try {
            var balance = await this.getBalance();
            balance.amount = amount;

            await this.adapter.updateAll({data: balance});
        } catch(err) {
            throw(err);
        }
    }
}