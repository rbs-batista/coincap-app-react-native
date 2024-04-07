import { ProductEntity } from "../entities";
import StorageAdapter from "../infrastructure/adapter/storage_adapter";
import { ProductModel } from "../models";

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

    static async findByAssetId({ id }: { id: string }): Promise<ProductModel | null> {
        
        const products = await this.adapter.all();
        if (products == null) return null;
        
        const product = products.find((item: { assetId: string }) => item.assetId === id);
        if (product == null) return null;
        
        const productModel = new ProductModel({
            id: product.id,
            assetId: product.assetId,
            amount: product.amount
        });

        return productModel;
    }

    static async findById({ id }: { id: string }): Promise<ProductModel | null> {
        
        const product = await this.adapter.findById({ id: id });
        
        if (product === null) return null;

        const productModel = new ProductModel({
            id: product.id,
            assetId: product.assetId,
            amount: product.amount
        });
        
        return productModel;
    }

    static async create({ product }: { product: ProductEntity }): Promise<ProductModel | null> {
        

        await this.adapter.create({ newData: product });

        
        const productModel = await this.findById({ id: product.id });
        
        return productModel;
    }

    static async update({ product }: { product: ProductEntity }): Promise<ProductModel | null> {

        
        await this.adapter.update({ updateData:  product});
        
        const productModel = await this.findById({ id: product.id });
        
        return productModel;
    }

    static async delete({ id }: { id: string }) {
        return await this.adapter.delete({ id: id });
    }
}