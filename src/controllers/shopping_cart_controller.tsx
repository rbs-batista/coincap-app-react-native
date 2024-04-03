import { Double } from "react-native/Libraries/Types/CodegenTypes";
import PurchaseOrderService from "../services/purchase_order_service";

export default class ShoppingCartController {
    static async buy({id, amount} : {id: string, amount: Double}): Promise<void> {
        try {
            console.log(`2[ShoppingCartController][req][buy]id: ${id}, type: ${amount}`);
            await PurchaseOrderService.store({assetId: id, amount: amount});
            console.log(`2[ShoppingCartController][res][buy]`);
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