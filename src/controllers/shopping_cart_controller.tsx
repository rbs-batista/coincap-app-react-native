import { Double } from "react-native/Libraries/Types/CodegenTypes";
import PurchaseOrderService from "../services/purchase_order_service";
import { OrderTypeEnum } from "../enums";

export default class ShoppingCartController {
    static async buy({assetId, amount, type} : {assetId: string, amount: Double, type: OrderTypeEnum}): Promise<void> {
        try {
            console.log("type: " + type);
            await PurchaseOrderService.buy({assetId: assetId, amount: amount, type: type});
        } catch(err) {
            throw(err);
        }
    }

    static async sale({productId, amount, type} : { productId: string, amount: Double, type: OrderTypeEnum}):  Promise<void> {
        try {
            console.log("type: " + type);
            await PurchaseOrderService.sale({productId: productId, amount: amount, type: type});
        } catch(err) {
            throw(err);
        }
    }
}