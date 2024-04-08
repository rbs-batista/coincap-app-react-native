import { ProductEntity } from "../entities";
import { AssetModel, ProductModel } from "../models";
import { StoreModel } from "../models/store_model";
import AssetRepository from "../repositories/asset_repository";
import ProductRepository from "../repositories/product_repository";
import BaasService from "./baas_service";

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