import AsyncStorage from '@react-native-async-storage/async-storage';

export default class AsyncStorageDriver {

    static async getAllKeys(): Promise<any> {
        try {
            
            const data = await AsyncStorage.getAllKeys();
            
            return data;

        } catch (err) {
            throw (err);
        }
    }

    static async fetch(key: string): Promise<any> {
        try {
            
            const data = await AsyncStorage.getItem(key);
            
            return data != null ? JSON.parse(data) : null;
        } catch (err) {
            throw (err);
        }
    }

    static async save(key: string, data: any): Promise<void> {
        try {
            
            await AsyncStorage.setItem(key, JSON.stringify(data));
        
        } catch (err) {
            throw (err);
        }
    }

    static async update(key: string, data: any): Promise<void> {
        try {
            
            await AsyncStorage.mergeItem(key, JSON.stringify(data));
            
        } catch (err) {
            throw (err);
        }
    }

    static async delete(key: string): Promise<void> {
        try {
            
            await AsyncStorage.removeItem(key);
            
        } catch (err) {
            throw (err);
        }
    }

    static async multiSet(kets: any): Promise<void> {
        try {
            
            await AsyncStorage.multiSet(kets);
            
        } catch (err) {
            throw (err);
        }
    }

}