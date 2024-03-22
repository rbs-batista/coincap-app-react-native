export default class AssetsRepository {

    static async list() {
        try {
            // var assets = [];

            return fetch('https://api.coincap.io/v2/assets')
                .then((response) => response.json())
                .then((json) => {
                    return json.data;
                });
            // return fetch('https://api.coincap.io/v2/assets',
            //     {
            //         headers: {
            //             'Content-Type': 'application/json'
            //         }

            //     }
            // )
            //     .then(res => {
            //         console.log("data: " + res.json());
            //         if (!res.ok) {
            //             throw new Error('Erro ao buscar ativos: ' + res.status);
            //         }
            //         return res.json();
            //     }).then((jsonData: any[]) => {
            //         console.log("data: " + jsonData);
            //         const assets = jsonData.map(asset => {
            //             console.log(asset);
            //             // return new AssetsModel(asset.id, asset.symbol, asset.name, asset.supply, asset.averagePrice, asset.changePercent);
            //         })
            //         console.log(jsonData);
            //         return assets;
            //     });
        } catch (err) {
            console.log('Erro ao buscar dados:', err);
            throw err;
        }
    }
}