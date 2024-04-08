import { Money, Util } from "../helpers";
export class AssetModel {
    id: string;
    rank: string;
    symbol: string;
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
        this.symbol = symbol,  
        this.avatar = Util.getFirstQuantityCharacters({name: symbol, quantity: 2}), 
        this.name = name, 
        this.price = Money.format({value: priceUsd}),
        this.percent = Money.format({value: changePercent24Hr}),
        this.supply = Money.format({value: supply}), 
        this.maxSupply = Money.format({value: maxSupply}),
        this.marketCap = Money.format({value: marketCapUsd}),
        this.volume = Money.format({value: volumeUsd24Hr}),
        this.averagePrice = Money.format({value: vwap24Hr}) 
    }

    static default(): AssetModel {
        return new AssetModel({
            id: 'N/A',
            rank: 'N/A',
            symbol: 'N/A',
            name: 'N/A',
            supply: '0',
            maxSupply: '0',
            marketCapUsd: '0',
            volumeUsd24Hr: '0',
            priceUsd: '0',
            changePercent24Hr: '0',
            vwap24Hr: '0',
        });
    }

}