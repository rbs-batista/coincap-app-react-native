import { OrderTypeEnum } from '../enums';
import uuid from 'uuid-random';
export class OrderEntity{
    id: string;
    assetId: string;
    productId: string;
    assetName: string;
    assetPercent: number; 
    assetPrice: number; 
    amount: number;
    type: OrderTypeEnum;

    constructor(
        {assetId, productId, assetName, assetPercent, assetPrice, amount, type}: 
        {assetId: string, productId: string, assetName: string,
         assetPercent: number, assetPrice: number, amount: number, type: OrderTypeEnum}
    ) {
        this.id = uuid(),
        this.assetId = assetId,
        this.productId = productId,
        this.assetName = assetName,
        this.assetPrice = assetPrice,
        this.assetPercent = assetPercent,
        this.amount = amount,
        this.type = type
    }
}