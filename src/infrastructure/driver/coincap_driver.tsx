export default class CoincapDriver {
    
    private static base_url = 'https://api.coincap.io';

    static async get(endpoint: string): Promise<any> {
        try {
            console.log(`7[CoincapDriver][req][get]endpoint:${endpoint}`);
            const res = await fetch(this.base_url + endpoint);
            const data = await res.json();
            console.log(`7[CoincapDriver][res][get]data`);
            return data.data;
        } catch(err) {
            throw(err);
        }
    }
}