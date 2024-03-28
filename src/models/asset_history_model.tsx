export class AssetHistoryModel {
    price: string;
    date: Date;

    constructor({price, date} : {price: string, date: number}) {
        this.price = price;
        this.date = new Date(date);
    }
}