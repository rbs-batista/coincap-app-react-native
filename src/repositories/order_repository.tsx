import StorageAdapter from "../infrastructure/adapter/storage_adapter";
import Uuid from 'react-native-uuid';
import { OrderModel } from "../models";

export default class OrderRepository {
    private static key: string = '@order_key';
    private static adapter = new StorageAdapter(this.key);

    static async all(): Promise<[OrderModel]>{
        try {
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
        } catch(err) {
            throw(err);
        }
    }

    static async findById({id}:{id: string}): Promise<OrderModel> {
        try {
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
        } catch(err) {
            throw(err);
        }
    }

    static async create(
        {assetId, productId, assetName, assetPercent, assetPrice, purchasePrice, type}:
        {assetId: string, productId: string, assetName: string,
         assetPercent: string, assetPrice: string, purchasePrice: number, type: string}
    ){
        try {
            const data = {
                id: Uuid.v4.toString,
                productId: productId,
                assetId: assetId,
                assetName: assetName,
                assetPercent: assetPercent,
                assetPrice: assetPrice,
                purchasePrice: purchasePrice,
                type: type
            };
            return await this.adapter.create({data: data});
        } catch(err) {
            throw(err);
        }
    }

    static async delete({id}:{id: string}) {
        try {
            await this.adapter.delete({id: id});
        } catch(err) {
            throw(err);
        }
    }
}