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
        console.log(`3[StoreService][req][finByAssetId]id: ${id}`);
        const product = await ProductRepository.findByAssetId({ id: id });
        console.log(`3[StoreService][res][finByAssetId]product: ${JSON.stringify(product)}`);
        return product;
    }

    static async buy({ assetId, amount }: { assetId: string, amount: number }): Promise<ProductModel | null> {
        console.log(`3[StoreService][req][buy]: ${assetId}, ${amount}`);
        var product = await this.findByAssetId({ id: assetId });
        console.log(`3[StoreService][res][buy]product: ${JSON.stringify(product)}`);
        const balance = await BaasService.getBalance();
        console.log(`3[StoreService][res][buy]balance: ${JSON.stringify(balance)}`);
        if (balance.amount < amount) {
            throw new Error(`Saldo de ${balance.amount} é insuficiente para compra de ${amount}`);
        }
        console.log(`3[StoreService][res][buy]throw`);

        const productEntity = new ProductEntity({
            assetId: assetId,
            amount: amount
        });

        if (product == null) {
            console.log(`3[StoreService][req][buy]create productEntity: ${JSON.stringify(productEntity)}`);
            product = await ProductRepository.create({ product: productEntity});
            console.log(`3[StoreService][res][buy]create product: ${JSON.stringify(product)}`);
        } else {
            productEntity.id = product.id;
            productEntity.amount += amount; 
            console.log(`3[StoreService][req][buy]update productEntity: ${JSON.stringify(productEntity)}`);
            product = await ProductRepository.update({ product: productEntity });
            console.log(`3[StoreService][res][buy]update product: ${JSON.stringify(product)}`);
        }

        console.log(`3[StoreService][req][buy]debit balance: ${amount}`);
        await BaasService.debit({ amount: amount });
        console.log(`3[StoreService][res][buy]debit`);

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