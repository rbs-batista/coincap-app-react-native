import { BalanceEntity } from "../../entities/balance_entity";
import AsyncStorageDriver from "../driver/async_storage_driver";
export default class StorageAdapter {
    private key: string;

    constructor(key: string) {
        this.key = key
    }

    async all(): Promise<any> {
        console.log(`5[StorageAdapter][req][all]fetch: ${this.key}`);
        const res = await AsyncStorageDriver.fetch(this.key);
        console.log(`5[StorageAdapter][res][all]fetch: ${JSON.stringify(res)}`);
        return res;
    }

    async findById({ id }: { id: string }): Promise<any> {
        const res = await this.all();

        if (res === null) return null;

        return res.find((item: { id: string }) => item.id === id);
    }

    async create({ data }: { data: any }): Promise<void> {
        console.log(`5[StorageAdapter][req][create]isKey: ${JSON.stringify(data)}`);
        await AsyncStorageDriver.save(this.key, data);
        console.log(`5[StorageAdapter][res][create]save key: ${this.key}, data:${data}`);
    }

    async update({ id, data }: { id: string, data: any }): Promise<void> {
        const res = await this.all();

        const currentData = res.filter((item: { id: string }) => item.id != id);

        currentData.add(data);

        await AsyncStorageDriver.save(this.key, currentData);
    }

    async updateAll({ balance }: { balance: BalanceEntity }): Promise<void> {
        await AsyncStorageDriver.save(this.key, balance);
    }

    async delete({ id }: { id: string }): Promise<void> {
        const res = await this.all();

        const currentData = res.filter((item: { id: string; }) => item.id != id);

        await AsyncStorageDriver.save(this.key, currentData);
    }

    private async isKey(): Promise<boolean> {
        const keys = await AsyncStorageDriver.getAllKeys();
        const key = keys.find((key: string) => key === this.key)

        if (key != null) return true;

        return false;
    }

    static async migrate(): Promise<boolean> {
        console.log(`5[StorageAdapter][req][migrate]getAllKeys`);
        const keys = await AsyncStorageDriver.getAllKeys();
        console.log(`5[StorageAdapter][res][migrate]getAllKeys ${JSON.stringify(keys)}`);
        if (keys.length == 0) {

            await AsyncStorageDriver.multiSet(
                [
                    ["@baas_key", JSON.stringify({ "amount": 1000.11 })],
                    ["@order_key", JSON.stringify([])],
                    ["@product_key", JSON.stringify([])]
                ]
            );

            const keys = await AsyncStorageDriver.getAllKeys();
            console.log(`5[StorageAdapter][res][migrate]multiSet ${JSON.stringify(keys)}`);
        }

        return true;
    }
}