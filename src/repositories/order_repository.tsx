import StorageAdapter from "../infrastructure/adapter/storage_adapter";
import { OrderModel } from "../models";
import { OrderEntity } from "../entities";

export default class OrderRepository {
    private static key: string = '@order_key';
    private static adapter = new StorageAdapter(this.key);

    static async all(): Promise<[OrderModel]>{

        const res = await this.adapter.all();
        const orders = res.map((order: { 
            id: string, 
            assetId: string, 
            productId: string, 
            assetName: string,
            assetPercent: number, 
            assetPrice: number, 
            amount: number, 
            type: string 
        }) => {
            return new OrderModel({
                id: order.id,
                assetId: order.assetId, 
                productId: order.productId, 
                assetName: order.assetName,
                assetPercent: order.assetPercent, 
                assetPrice: order.assetPrice, 
                amount: order.amount, 
                type: order.type 
            });
        })    

        return orders;
    }

    static async findById({id}:{id: string}): Promise<OrderModel> {

        const res = await this.adapter.findById({id: id});

        const order = new OrderModel({
            id: res.id,
            assetId: res.assetId, 
            productId: res.productId, 
            assetName: res.assetName,
            assetPercent: res.assetPercent, 
            assetPrice: res.assetPrice, 
            amount: res.amount, 
            type: res.type 
        });

        return order;
    }

    static async create({data}:{data: OrderEntity}): Promise<void> {
        console.log(`4[OrderRepository][req][create]create orderEntity:${JSON.stringify(data)}`);
        await this.adapter.create({newData: data});
        console.log(`4[OrderRepository][req][create]create`);
    }

    static async delete({id}:{id: string}): Promise<void> {
        await this.adapter.delete({id: id});
    }
}