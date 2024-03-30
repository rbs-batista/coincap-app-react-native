import { BalanceEntity } from "../../entities/balance_entity";
import AsyncStorageDriver from "../driver/async_storage_driver";
export default class StorageAdapter {
    private key: string;

    constructor(key: string) { this.key = key}

    async all(): Promise<any> {
        return await AsyncStorageDriver.fetch(this.key);
    }

    async findById({id}:{id: string}): Promise<any> {
        const res = await this.all();

        return res.find((item: { id: string }) => item.id === id);
    }

    async create({data}: {data: any}): Promise<void> {
        const isKey = await this.isKey();
        if(isKey) {
            return await AsyncStorageDriver.update(this.key, data);
        }

        return await AsyncStorageDriver.save(this.key, data);
    }

    async update ({id, data}: {id: string, data: any}): Promise<void> {
        const res = await this.all();

        const currentData = res.filter((item: { id: string }) => item.id != id);

        currentData.add(data);

        await AsyncStorageDriver.save(this.key, currentData);
    }

    async updateAll({balance}:{balance: BalanceEntity}): Promise<void> {
        await AsyncStorageDriver.save(this.key, balance);
    }

    async delete({id}:{id: string}): Promise<void> {
        const res = await this.all();

        const currentData = res.filter((item: { id: string; }) => item.id != id);

        await AsyncStorageDriver.save(this.key, currentData);
    }

    private async isKey(): Promise<boolean>{
       const keys = await AsyncStorageDriver.getAllKeys();
       const key = keys.find((key: string) => key === this.key)

       if(key != null) return true;

       return false;
    }
}