import { OrderEntity, ProductEntity } from "../entities";
import { AssetModel, OrderModel, ProductModel } from "../models";
import OrderRepository from "../repositories/order_repository";
import { OrderTypeEnum } from "../enums";

export default class OrderService {
    static async all(): Promise<[OrderModel]> {
        return await OrderRepository.all();
    }
    
    static async findById({id}:{id: string}): Promise<OrderModel> {
        return await OrderRepository.findById({id: id});
    }

    static async create(
        {asset, product, type, amount}: 
        {asset: AssetModel, product: any, type: OrderTypeEnum, amount: number}
    ): Promise<void> {
        console.log(`3[OrderService][req][create]create orderEntity: ${JSON.stringify({asset, product, type, amount})}`);
        const orderEntity = new OrderEntity({
            productId: product.id,
            assetId: asset.id,
            assetName: asset.name,
            assetPercent: asset.percent,
            assetPrice: asset.price,
            amount: amount,
            type: type
        });

        console.log(`3[OrderService][req][create]create orderEntity: ${JSON.stringify(orderEntity)}`);
        await OrderRepository.create({data: orderEntity});
        console.log(`3[OrderService][res][create]create`);
    }
}