import { BalanceEntity } from "../../entities/balance_entity";
import AsyncStorageDriver from "../driver/async_storage_driver";
export default class StorageAdapter {
    private key: string;

    constructor(key: string) {
        this.key = key
    }

    async all(): Promise<any> {
        
        const res = await AsyncStorageDriver.fetch(this.key);
        
        return res;
    }

    async findById({ id }: { id: string }): Promise<any> {
        const res = await this.all();

        if (res === null) return null;

        return res.find((item: { id: string }) => item.id === id);
    }

    async create({ newData }: { newData: any }): Promise<void> {
        
        var data = await this.all();
        
        const isArray = Array.isArray(data);
        
        
        if(isArray) {
            data.push(newData);            
        } else {
            data = newData;
        }

        await AsyncStorageDriver.save(this.key, data);
        
    }

    async update({ updateData }: { updateData: any }): Promise<void> {

        
        var data = await this.all();
        
        const isArray = Array.isArray(data);
        

        if(isArray) {
            
            data = data.filter((item: { id: string }) => item.id != updateData.id);
            data.push(updateData); 
            
        } else {
            
            data = updateData;
            
        }

        
        await AsyncStorageDriver.save(this.key, data);
        
    }

    async delete({ id }: { id: string }): Promise<void> {
        const res = await this.all();

        const currentData = res.filter((item: { id: string }) => item.id != id);

        await AsyncStorageDriver.save(this.key, currentData);
    }

    private async isKey(): Promise<boolean> {
        const keys = await AsyncStorageDriver.getAllKeys();
        const key = keys.find((key: string) => key === this.key)

        if (key != null) return true;

        return false;
    }

    static async migrate(): Promise<boolean> {
        
        const keys = await AsyncStorageDriver.getAllKeys();
        
        if (keys.length == 0) {

            await AsyncStorageDriver.multiSet(
                [
                    ["@baas_key", JSON.stringify({ "amount": 1000.11 })],
                    ["@order_key", JSON.stringify([])],
                    ["@product_key", JSON.stringify([])]
                ]
            );

            const keys = await AsyncStorageDriver.getAllKeys();
            
        }

        return true;
    }
}