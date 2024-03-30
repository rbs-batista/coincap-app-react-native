import { MoneyFormat } from "../helpers";

export class AssetModel {
    id: string;
    rank: string;
    avatar: string;
    name: string;
    price: number;
    percent: number
    supply: number;
    maxSupply: number;
    marketCap: number;
    volume: number;
    averagePrice: number;

    constructor({id, rank, symbol, name, supply, maxSupply, marketCapUsd, volumeUsd24Hr, priceUsd, changePercent24Hr, vwap24Hr} : {
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
    }) {
        this.id = id, 
        this.rank = rank, 
        this.avatar = symbol, 
        this.name = name, 
        this.price = MoneyFormat.format({value: priceUsd}),
        this.percent = MoneyFormat.format({value: priceUsd}),
        this.supply = MoneyFormat.format({value: priceUsd}), 
        this.maxSupply = MoneyFormat.format({value: priceUsd}),
        this.marketCap = MoneyFormat.format({value: priceUsd}),
        this.volume = MoneyFormat.format({value: priceUsd}),
        this.averagePrice = MoneyFormat.format({value: priceUsd}) 
    }
}