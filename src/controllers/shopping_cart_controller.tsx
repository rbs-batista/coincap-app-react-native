import { Double } from "react-native/Libraries/Types/CodegenTypes";
import PurchaseOrderService from "../services/purchase_order_service";
import { OrderTypeEnum } from "../enums";

export default class ShoppingCartController {
    static async buy({id, amount, type} : {id: string, amount: Double, type: OrderTypeEnum}): Promise<void> {
        try {
            console.log("type: " + type);
            await PurchaseOrderService.store({assetId: id, amount: amount, type: type});
        } catch(err) {
            throw(err);
        }
    }

    static async sale({id, amount} : {id: string, amount: Double}):  Promise<void> {
        try {
            await PurchaseOrderService.sale({id, amount});
        } catch(err) {
            throw(err);
        }
    }
}