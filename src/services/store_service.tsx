import { ProductEntity } from "../entities";
import { ProductModel } from "../models";
import ProductRepository from "../repositories/product_repository";
import BaasService from "./baas_service";

export default class StoreService {
    static async all(): Promise<[ProductModel]> {
        const products = await ProductRepository.all();
        return products;
    }

    static async findById({ id }: { id: string }): Promise<ProductModel | null> {
        const product = await ProductRepository.findById({ id: id });
        return product;
    }

    static async findByAssetId({ id }: { id: string }): Promise<ProductModel | null> {
        const product = await ProductRepository.findByAssetId({ id: id });
        
        return product;
    }

    static async buy({ assetId, amount }: { assetId: string, amount: number }): Promise<ProductModel | null> {
       
        var product = await this.findByAssetId({ id: assetId });
       
        const balance = await BaasService.getBalance();
 
        if (balance.amount < amount) {
            throw new Error(`Saldo de ${balance.amount} é insuficiente para compra de ${amount}`);
        }

        const productEntity = new ProductEntity({
            assetId: assetId,
            amount: amount
        });

        if (product == null) {
            
            product = await ProductRepository.create({ product: productEntity});
            
        } else {
            productEntity.id = product.id;
            productEntity.amount += amount; 
            
            product = await ProductRepository.update({ product: productEntity });
            
        }

        await BaasService.debit({ amount: amount });

        return product;
    }

    static async sale({ assetId, amount }: { assetId: string, amount: number }): Promise<void> {

        // var product = await ProductRepository.findById({ id: assetId });

        // if (product === null) return;
        // product.amount -= amount;

        // if (product.amount < 0) {
        //     throw new Error(`O valor de venda ${amount} é maior que o total disponível de ${product.amount}`);
        // }

        // if (product.amount == 0) {
        //     await ProductRepository.delete({ id: assetId });
        // }

        // await ProductRepository.update({ id: assetId, data: product });
    }
}