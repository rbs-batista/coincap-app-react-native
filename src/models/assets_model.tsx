class AssetsModel {
    id: string;
    avatar: string;
    name: string;
    averagePrice: string;
    money: string;
    percent: string

    constructor(id: string, symbol: string, name: string, supply: string, averagePrice: string, changePercent: string) {
        this.id = id;
        this.avatar = symbol;
        this.name = name;
        this.averagePrice = averagePrice;
        this.money = supply;
        this.percent = changePercent;
    }
}