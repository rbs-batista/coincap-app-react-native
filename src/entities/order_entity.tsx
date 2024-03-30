import { OrderTypeEnum, OrderTypeFromEnum, OrderTypeToEnum} from '../enums';
export class OrderEntity{
    id: string;
    assetId: string;
    productId: string;
    assetName: string;
    assetPercent: number; 
    assetPrice: number; 
    amount: number;
    type: string;

    constructor(
        {id, assetId, productId, assetName, assetPercent, assetPrice, amount, type}: 
        {id: string, assetId: string, productId: string, assetName: string,
         assetPercent: number, assetPrice: number, amount: number, type: OrderTypeEnum}
    ) {
        this.id = id,
        this.assetId = assetId,
        this.productId = productId,
        this.assetName = assetName,
        this.assetPrice = assetPrice,
        this.assetPercent = assetPercent,
        this.amount = amount,
        this.type = OrderTypeToEnum(type)
    }
}