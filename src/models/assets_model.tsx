class AssetsModel {
    id: string;
    symbol: string;
    name: string;
    supply: string;
    changePercent24Hr: string
    vwap24Hr: string;

    constructor(id: string, symbol: string, name: string, supply: string, vwap24Hr: string, changePercent24Hr: string) {
        this.id = id;
        this.symbol = symbol;
        this.name = name;
        this.supply = supply;
        this.vwap24Hr = vwap24Hr;
        this.changePercent24Hr = changePercent24Hr;
    }
}