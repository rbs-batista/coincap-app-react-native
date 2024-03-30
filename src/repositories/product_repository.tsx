import StorageAdapter from "../infrastructure/adapter/storage_adapter";
import { ProductModel } from "../models";
import { ProductEntity } from "../entities";

export default class ProductRepository {
    private static key: string = '@product_key';
    private static adapter = new StorageAdapter(this.key);

    static async all(): Promise<[ProductModel]> {
        const res = await this.adapter.all();
        const products = res.map((product: {
            id: string,
            assetId: string;
            amount: number;
        }) => {
            return new ProductModel({
                id: product.id,
                assetId: product.assetId,
                amount: product.amount
            });
        })

        return products;
    }

    static async finByAssetId({id}:{id: string}): Promise<ProductModel> {
        const products = await this.adapter.all();
        const product = products.find((item: { assetId: string }) => item.assetId === id);

        const productModel = new ProductModel({
            id: product.id,
            assetId: product.assetId,
            amount: product.amount
        });

        return productModel;
    }

    static async findById({id}: {id: string}): Promise<ProductModel> {
        const product = await this.adapter.findById({id: id});

        const productModel = new ProductModel({
            id: product.id,
            assetId: product.assetId,
            amount: product.amount
        });

        return productModel;
    }

    static async create({assetId, amount}:{assetId: string, amount: number}): Promise<ProductModel> {

        const productEntity = new ProductEntity({
            assetId: assetId,
            amount: amount
        });

        await this.adapter.create({data: productEntity});

        const productModel = await this.findById({id: productEntity.id});

        return productModel;
    }

    static async update({id, data}: {id: string, data: any}) {
        return await this.adapter.update({id: id, data: data});
    }

    static async delete({id}: {id: string}) {
        return await this.adapter.delete({id: id});
    }
}