import ApiAdapter from "../infrastructure/adapter/api_adapter";
import { AssetHistoryModel, AssetModel } from "../models";
export default class AssetRepository {

    static async all(): Promise<[AssetModel]> {
        
        const res = await ApiAdapter.getAllAsset();
        
        const assets = res.map((asset: {
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
                symbol: asset.symbol,
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
    }

    static async findById({ id }: { id: string }): Promise<AssetModel> {
        
        const res = await ApiAdapter.getByAssetId({ id: id });
        
        const asset = new AssetModel({
            id: res.id,
            rank: res.rank,
            symbol: res.symbol,
            name: res.name,
            supply: res.supply,
            maxSupply: res.maxSupply,
            marketCapUsd: res.marketCapUsd,
            volumeUsd24Hr: res.volumeUsd24Hr,
            priceUsd: res.priceUsd,
            changePercent24Hr: res.changePercent24Hr,
            vwap24Hr: res.vwap24Hr
        });
        
        return asset;
    }

    static async findByIdAndInterval({ id, interval }: { id: string, interval: string }): Promise<[AssetHistoryModel]> {
        const res = await ApiAdapter.getByAssetIdAndInterval({ id: id, interval: interval });
        const stories = res.map((history: {
            priceUsd: string;
            time: number,
        }) => {
            return new AssetHistoryModel({
                price: history.priceUsd,
                date: history.time,
            })
        })

        return stories;
    }
}