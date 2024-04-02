import { ProductModel } from "../models";
import ProductRepository from "../repositories/product_repository";
import BaasService from "./baas_service";

export default class StoreService {
    static async all(): Promise<[ProductModel]> {
        const products = await ProductRepository.all();
        return products;
    }
    
    static async findById({id}:{id: string}): Promise<ProductModel | null> {
        const product = await ProductRepository.findById({id: id});
        return product;
    }

    static async findByAssetId({id}: {id: string}): Promise<ProductModel> {
        const product = ProductRepository.finByAssetId({id: id});
        return product;
    }
    
    static async buy({assetId, amount}:{assetId: string, amount: number}): Promise<ProductModel | null>{
        
        var product = await ProductRepository.findById({id: assetId});
        console.log('product buy:' + product);
        const balance = await BaasService.getBalance();

        if(balance != null && balance.amount < amount) {
            throw new Error(`Saldo de ${balance.amount} é insuficiente para compra de ${amount}`);
        }
        
        if(product == null) {
            console.log('product create:' + product);
            product = await ProductRepository.create({assetId: assetId, amount: amount});
        } else {
            console.log('product update:' + product);
            product.amount += amount;
            await ProductRepository.update({id: assetId, data: product});
        }

        await BaasService.debit({amount: amount});
        console.log('product debit:' + amount);
        return product;
    }

    static async sale({assetId, amount}:{assetId: string, amount: number}): Promise<void> {

        var product = await ProductRepository.findById({id: assetId});

        if(product === null) return;
        product.amount -= amount; 

        if(product.amount < 0) {
            throw new Error(`O valor de venda ${amount} é maior que o total disponível de ${product.amount}`);
        }

        if(product.amount == 0) {
            await ProductRepository.delete({id: assetId});
        }

        await ProductRepository.update({id: assetId, data: product});
    }
}