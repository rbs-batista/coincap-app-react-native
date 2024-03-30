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
        this.price = parseFloat(priceUsd),
        this.percent = parseFloat(changePercent24Hr),
        this.supply = parseFloat(supply), 
        this.maxSupply = parseFloat(maxSupply),
        this.marketCap = parseFloat(marketCapUsd),
        this.volume = parseFloat(volumeUsd24Hr),
        this.averagePrice = parseFloat(vwap24Hr) 
    }
}