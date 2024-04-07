export default class CoincapDriver {

    private static base_url = 'https://api.coincap.io';

    static async get(endpoint: string): Promise<any> {
        try {
            
            const res = await fetch(this.base_url + endpoint);
            const data = await res.json();
            
            return data.data;
        } catch (err) {
            throw (err);
        }
    }
}