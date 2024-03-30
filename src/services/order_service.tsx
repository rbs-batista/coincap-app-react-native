import { OrderModel } from "../models";
import OrderRepository from "../repositories/order_repository";

export default class OrderService {
    static async all(): Promise<[OrderModel]> {
        const orders = await OrderRepository.all();
        return orders;
    }
    
    static async findById({id}:{id: string}): Promise<OrderModel> {
        const order = await OrderRepository.findById({id: id});
        return order;
    }
}