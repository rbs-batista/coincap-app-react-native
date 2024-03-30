export class AssetHistoryModel {
    price: number;
    date: Date;

    constructor({price, date} : {price: string, date: number}) {
        this.price = parseFloat(price);
        this.date = new Date(date);
    }
}