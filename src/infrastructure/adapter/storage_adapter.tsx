import AsyncStorageDriver from "../driver/async_storage_driver";
export default class StorageAdapter {
    private key: string;

    constructor(key: string) { this.key = key}

    async all() {
        return await AsyncStorageDriver.fetch(this.key);
    }

    async findById({id}:{id: string}) {
        const res = await this.all();

        return res.find((item: { id: string }) => item.id === id);
    }

    async create({data}: {data: any}) {
        const isKey = await this.isKey();
        if(isKey) {
            return await AsyncStorageDriver.update(this.key, data);
        }

        return await AsyncStorageDriver.save(this.key, data);
    }

    async update ({id, data}: {id: string, data: any}) {
        const res = await this.all();

        const currentData = res.filter((item: { id: string }) => item.id != id);

        currentData.add(data);

        return await AsyncStorageDriver.save(this.key, currentData);
    }

    async updateAll({data}:{data: any}) {
        return await AsyncStorageDriver.save(this.key, data);
    }

    async delete({id}:{id: string}) {
        const res = await this.all();

        const currentData = res.filter((item: { id: string; }) => item.id != id);

        return await AsyncStorageDriver.save(this.key, currentData);
    }

    private async isKey() : Promise<boolean>{
       const keys = await AsyncStorageDriver.getAllKeys();
       const key = keys.find((key: string) => key === this.key)

       if(key != null) return true;

       return false;
    }
}