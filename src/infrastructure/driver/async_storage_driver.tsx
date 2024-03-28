import AsyncStorage from '@react-native-async-storage/async-storage';

export default class AsyncStorageDriver {

    static async getAllKeys(): Promise<any>{
        try {

            return await AsyncStorage.getAllKeys();
             
        } catch(err) {
            console.log(err);
        }
    }

    static async fetch(key: string): Promise<any> {
        try {

            const data = await AsyncStorage.getItem(key);
            return data != null ? JSON.parse(data) : null;
        } catch(err) {
            console.log(err);
        }
    }

    static async save(key: string, data: any): Promise<void> {
        try {
            await AsyncStorage.setItem(key, JSON.stringify(data));
        } catch(err) {
            console.log(err);
        }
    }

    static async update(key: string, data: any): Promise<void> {
        try {
            await AsyncStorage.mergeItem(key, JSON.stringify(data));
        } catch(err) {
            console.log(err);
        }
    }

    static async delete(key: string): Promise<void> {
        try {
            await AsyncStorage.removeItem(key);
        } catch(err) {
            console.log(err);
        }
    }

}