export class AssetModel {
    id: string;
    rank: string;
    avatar: string;
    name: string;
    price: string;
    percent: string
    supply: string;
    maxSupply: string;
    marketCap: string;
    volume: string;
    averagePrice: string;

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
        this.price = priceUsd,
        this.percent = changePercent24Hr,
        this.supply = supply, 
        this.maxSupply = maxSupply,
        this.marketCap = marketCapUsd,
        this.volume = volumeUsd24Hr,
        this.averagePrice = vwap24Hr 
    }
}