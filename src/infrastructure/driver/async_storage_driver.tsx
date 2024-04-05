import AsyncStorage from '@react-native-async-storage/async-storage';

export default class AsyncStorageDriver {

    static async getAllKeys(): Promise<any> {
        try {
            console.log(`6[AsyncStorageDriver][req][getAllKeys]getAllKeys`);
            const data = await AsyncStorage.getAllKeys();
            console.log(`6[AsyncStorageDriver][res][getAllKeys]data: ${JSON.stringify(data)}`);
            return data;

        } catch (err) {
            throw (err);
        }
    }

    static async fetch(key: string): Promise<any> {
        try {
            console.log(`6[AsyncStorageDriver][req][fetch]getItem data: ${key}`);
            const data = await AsyncStorage.getItem(key);
            console.log(`6[AsyncStorageDriver][res][fetch]getItem data: ${data}`);
            return data != null ? JSON.parse(data) : null;
        } catch (err) {
            throw (err);
        }
    }

    static async save(key: string, data: any): Promise<void> {
        try {
            console.log(`6[AsyncStorageDriver][req][save]setItem: ${key}, data: ${JSON.stringify(data)}`);
            await AsyncStorage.setItem(key, JSON.stringify(data));
            console.log(`6[AsyncStorageDriver][res][save]setItem`);
        } catch (err) {
            throw (err);
        }
    }

    static async update(key: string, data: any): Promise<void> {
        try {
            console.log(`6[AsyncStorageDriver][req][update]mergeItem: ${key}, data: ${JSON.stringify(data)}`);
            await AsyncStorage.mergeItem(key, JSON.stringify(data));
            console.log(`6[AsyncStorageDriver][res][update]mergeItem`);
        } catch (err) {
            throw (err);
        }
    }

    static async delete(key: string): Promise<void> {
        try {
            console.log(`6[AsyncStorageDriver][res][delete]removeItem: key ${key}`);
            await AsyncStorage.removeItem(key);
            console.log(`6[AsyncStorageDriver][res][delete]removeItem`);
        } catch (err) {
            throw (err);
        }
    }

    static async multiSet(kets: any): Promise<void> {
        try {
            console.log(`6[AsyncStorageDriver][res][multiSet]multiSet: key ${JSON.stringify(kets)}`);
            await AsyncStorage.multiSet(kets);
            console.log(`6[AsyncStorageDriver][res][multiSet]multiSet`);
        } catch (err) {
            throw (err);
        }
    }

}