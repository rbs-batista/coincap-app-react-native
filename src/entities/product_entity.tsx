import uuid from 'uuid-random';
export class ProductEntity{
    id: string;
    assetId: string;
    amount: number;

    constructor(
        {assetId, amount}: 
        {assetId: string, amount: number}
    ) {
        this.id = uuid()
        this.assetId = assetId,
        this.amount = amount
    }
}