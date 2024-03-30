export default class CoincapDriver {
    
    private static base_url = 'https://api.coincap.io';

    static async get(endpoint: string): Promise<any> {
        try {
            const res = fetch(this.base_url + endpoint)
                        .then((res) => res.json())
                        .then((json) => json)
                        .catch((err => { throw(err) }));

            return res;
        } catch(err) {
            throw(err);
        }
    }
}