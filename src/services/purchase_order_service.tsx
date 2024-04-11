import { OrderTypeEnum } from "../enums";
import AssetService from "./asset_service";
import OrderService from "./order_service";
import StoreService from "./store_service";

export default class PurchaseOrderService {

    static async buy({ assetId, amount, type }: { assetId: string, amount: number, type: OrderTypeEnum }): Promise<void> {

        const asset = await AssetService.findById({ id: assetId });

        const product = await StoreService.buy({ assetId: assetId, amount: amount });

        await OrderService.create({asset: asset, product: product, 
                                    type: type, amount: amount});

    }

    static async sale({ productId, amount, type }: { productId: string, amount: number, type: OrderTypeEnum }): Promise<void> {

        const product = await StoreService.sale({ productId: productId, amount: amount });

        const asset = await AssetService.findById({ id: product!.assetId });

        await OrderService.create({asset: asset, product: product, 
            type: type, amount: amount});
    }
}