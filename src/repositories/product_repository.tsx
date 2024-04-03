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

    static async findByAssetId({id}:{id: string}): Promise<ProductModel | null> {
        console.log(`5[ProductRepository][req][finByAssetId]id: ${id}`);
        const products = await this.adapter.all();
        if(products == null) return null;
        console.log(`5[ProductRepository][req][finByAssetId]id: ${JSON.stringify(products)}`);
        const product = products.find((item: { assetId: string }) => item.assetId === id);
        if(product == null) return null;
        console.log(`5[ProductRepository][req][finByAssetId]product: ${JSON.stringify(product)}`);
        const productModel = new ProductModel({
            id: product.id,
            assetId: product.assetId,
            amount: product.amount
        });

        return productModel;
    }

    static async findById({id}: {id: string}): Promise<ProductModel | null> {
        const product = await this.adapter.findById({id: id});

        if(product === null) return null;
    
        const productModel = new ProductModel({
            id: product.id,
            assetId: product.assetId,
            amount: product.amount
        });

        return productModel;
    }

    static async create({assetId, amount}:{assetId: string, amount: number}): Promise<ProductModel | null> {

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