import { Double } from "react-native/Libraries/Types/CodegenTypes";
import PurchaseOrderService from "../services/purchase_order_service";

export default class ShoppingCartController {
    async buy({id, amount} : {id: string, amount: Double}): Promise<void> {
        try {
            await PurchaseOrderService.store({assetId: id, amount: amount});
        } catch(err) {
            throw(err);
        }
    }

    async sale({id, amount} : {id: string, amount: Double}):  Promise<void> {
        try {
            await PurchaseOrderService.sale({id, amount});
        } catch(err) {
            throw(err);
        }
    }
}