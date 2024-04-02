import StoreService from "./store_service";
import AssetService from "./asset_service";
import OrderService from "./order_service";
import { OrderTypeEnum } from "../enums";

export default class PurchaseOrderService {

    static async store({assetId, amount} : {assetId: string, amount: number}): Promise<void>{

        const asset = await AssetService.findById({id: assetId});

        const product = await StoreService.buy({assetId: assetId, amount: amount});

        // await OrderService.create({asset: asset, product: product, 
        //                             type: OrderTypeEnum.BUY, amount: amount});

    }

    static async sale({id, amount}: {id: string, amount: number}): Promise<void> {

        const asset = await AssetService.findById({id: id});

        const product = await StoreService.findById({id: id});

        if(product == null) return;
        
        await StoreService.sale({assetId: id, amount: amount});

        await OrderService.create({asset: asset, product: product, 
                                    type: OrderTypeEnum.SALE, amount: amount});

    }
}