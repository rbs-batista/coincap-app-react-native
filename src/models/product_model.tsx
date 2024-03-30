export class ProductModel{
    id: string;
    assetId: string;
    amount: number;

    constructor(
        {id, assetId, amount}: 
        {id: string, assetId: string, amount: number}
    ) {
        this.id = id,
        this.assetId = assetId,
        this.amount = amount
    }
}