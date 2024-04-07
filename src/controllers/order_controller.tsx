import OrderService from "../services/order_service";

export default class OrderController {
    static async index() {
        try {
            const orders = await OrderService.all();
            return orders;
        } catch (err) {
            throw(err);
        }
    }

    static async detail({ id }:{ id: string }) {

    }
}