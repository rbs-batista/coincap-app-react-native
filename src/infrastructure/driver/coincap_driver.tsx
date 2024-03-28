export default class CoincapDriver {
    
    private static base_url = 'https://api.coincap.io';

    static async get(endpoint: string): Promise<any> {
        return fetch(this.base_url + endpoint)
                .then((res) => res.json())
                .then((json) => json)
                .catch((err => { throw(err) }));
    }
}