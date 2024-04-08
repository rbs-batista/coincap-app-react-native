import { AssetModel } from "./asset_model";
import { ProductModel } from "./product_model";

export class StoreModel{
    product: ProductModel;
    asset: AssetModel;

    constructor(
        {product, asset}: 
        {product: ProductModel, asset: AssetModel}
    ) {
        this.product = product,
        this.asset = asset
    }
}