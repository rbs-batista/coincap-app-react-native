import Uuid from 'react-native-uuid';
export class ProductEntity{
    id: string;
    assetId: string;
    amount: number;

    constructor(
        {assetId, amount}: 
        {assetId: string, amount: number}
    ) {
        this.id = Uuid.v4.toString(),
        this.assetId = assetId,
        this.amount = amount
    }
}