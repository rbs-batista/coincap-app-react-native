import {AssetModel} from "../models";
export default class AssetRepository {

    static async list() {
        try {

            return fetch('https://api.coincap.io/v2/assets')
                .then((res) => res.json())
                .then((json) => {
                    var assets = json.data.map((asset: { 
                        id: string, 
                        rank: string, 
                        symbol: string, 
                        name: string, 
                        supply: string, 
                        maxSupply: string,
                        marketCapUsd: string,
                        volumeUsd24Hr: string,
                        priceUsd: string,
                        changePercent24Hr: string,
                        vwap24Hr: string, 
                    }) => {
                        return new AssetModel({
                            id: asset.id, 
                            rank: asset.rank,
                            symbol: asset.supply,
                            name: asset.name,
                            supply: asset.supply,
                            maxSupply: asset.maxSupply,
                            marketCapUsd: asset.marketCapUsd,
                            volumeUsd24Hr: asset.volumeUsd24Hr,
                            priceUsd: asset.priceUsd,
                            changePercent24Hr: asset.changePercent24Hr,
                            vwap24Hr: asset.vwap24Hr
                        })
                    })    

                    return assets;
                });
        } catch (err) {
            console.log('Erro ao buscar dados:', err);
            throw err;
        }
    }

    static async findById({id}: {id: string}) {
        try {

            return fetch('https://api.coincap.io/v2/assets/' + id)
                .then((res) => res.json())
                .then((json) => {
                    const asset = json.data;    
                    return new AssetModel({
                        id: asset.id, 
                        rank: asset.rank,
                        symbol: asset.supply,
                        name: asset.name,
                        supply: asset.supply,
                        maxSupply: asset.maxSupply,
                        marketCapUsd: asset.marketCapUsd,
                        volumeUsd24Hr: asset.volumeUsd24Hr,
                        priceUsd: asset.priceUsd,
                        changePercent24Hr: asset.changePercent24Hr,
                        vwap24Hr: asset.vwap24Hr
                    });
                });
        } catch (err) {
            console.log('Erro ao buscar dados:', err);
            throw err;
        }
    }
}