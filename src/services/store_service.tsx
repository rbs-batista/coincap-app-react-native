import { ProductEntity } from "../entities";
import { AssetModel, ProductModel } from "../models";
import { StoreModel } from "../models/store_model";
import AssetRepository from "../repositories/asset_repository";
import ProductRepository from "../repositories/product_repository";
import BaasService from "./baas_service";
import uuid from 'uuid-random';

export default class StoreService {
    static async all(): Promise<StoreModel[]> {
        const products = await ProductRepository.all();
        const assets = await AssetRepository.all();

        const assetIds: string[] = products.map(product => product.assetId);
        const filteredAssets = assets.filter(asset => assetIds.includes(asset.id));

        const stores = products.map((product: {
            id: string,
            assetId: string;
            amount: number;
        }) => {
            const asset = filteredAssets.find((asset) => asset.id === product.assetId);
   
            return new StoreModel({
                product: product, 
                asset: asset === undefined ? AssetModel.default() : asset,
            });
        })

        return stores;
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
            id: uuid(),
            assetId: assetId,
            amount: amount
        });

        if (product == null) {
            
            product = await ProductRepository.create({ product: productEntity});
            
        } else {
            productEntity.id = product.id;
            productEntity.amount += product.amount; 
            
            product = await ProductRepository.update({ product: productEntity });
        }

        await BaasService.debit({ amount: amount });

        return product;
    }

    static async sale({ productId, amount }: { productId: string, amount: number }): Promise<ProductModel | null> {

        var product = await ProductRepository.findById({ id: productId });

        if(product!.amount < amount) {
            throw new Error(`O valor de venda ${amount} é maior que o total disponível ${product!.amount}`); 
        }

        const productEntity = new ProductEntity({
            id: product!.id,
            assetId: product!.assetId,
            amount: product!.amount - amount
        }); 
        
        product = await ProductRepository.update({ product: productEntity });

        await BaasService.credit({ amount: amount });

        return product;
    }
}