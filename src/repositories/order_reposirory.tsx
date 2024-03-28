import StorageAdapter from "../infrastructure/adapter/storage_adapter";
export default class OrderRepository {
    private static key: string = '@order_key';
    private static adapter = new StorageAdapter(this.key);

    static async find() {
        try {
            return this.adapter.all();
        } catch(err) {
            throw(err);
        }
    }

    static async findById({id}:{id: string}) {
        try {
            return await this.adapter.findById({id: id});
        } catch(err) {
            throw(err);
        }
    }

    static async create({amount, assetId}:{amount: number, assetId: string}) {
        try {
            const data = {};
            return await this.adapter.create({data: {}});
        } catch(err) {
            throw(err);
        }
    }
}