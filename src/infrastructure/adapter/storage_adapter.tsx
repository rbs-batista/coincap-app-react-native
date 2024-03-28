import AsyncStorageDriver from "../driver/async_storage_driver";
export default class StorageAdapter {
    private key: string;

    constructor(key: string) { this.key = key}

    async all() {
        return await AsyncStorageDriver.fetch(this.key);
    }

    async findById({id}:{id: string}) {
        const orders = await this.all();

        return orders.find((order: { id: string; }) => order.id === id);
    }

    async create({data}: {data: any}) {
        const isKey = await this.isKey();
        if(isKey) {
            return await AsyncStorageDriver.update(this.key, data);
        }

        return await AsyncStorageDriver.save(this.key, data);
    }

    async delete({id}:{id: string}) {
        const orders = await this.all();

        const currentOrders = orders.filter((order: { id: string; }) => order.id != id);

        return await AsyncStorageDriver.save(this.key, currentOrders);
    }

    private async isKey() : Promise<boolean>{
       const keys = await AsyncStorageDriver.getAllKeys();
       const key = keys.find((key: string) => key === this.key)

       if(key != null) return true;

       return false;
    }
}