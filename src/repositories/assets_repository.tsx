export default class AssetsRepository {

    static async list() {
        try {
            return fetch('http://localhost:7021/assets/')
                .then(res => {
                    console.log("data: " + res);
                    if (!res.ok) {
                        throw new Error('Erro ao buscar ativos: ' + res.status);
                    }
                    return res.json();
                }).then((jsonData: any[]) => {
                    const assets: AssetsModel[] = jsonData.map(asset => {
                        return new AssetsModel(asset.id, asset.symbol, asset.name, asset.supply, asset.averagePrice, asset.changePercent);
                    })
                    console.log(jsonData);
                    return assets;
                });
        } catch (err) {
            console.log('Erro ao buscar dados:', err);
            throw err;
        }
    }
}