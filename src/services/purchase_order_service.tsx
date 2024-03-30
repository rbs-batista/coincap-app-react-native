import OrderRepository from "../repositories/order_repository";
import StoreService from "./store_service";
import AssetService from "./asset_service";
import BaasService from "./baas_service";

export default class PurchaseOrderService {
    // static async all() {
    //     try {

    //     } catch(err) {
    //         throw(err);
    //     }
    // }

    // static async findById({id}:{id: string}) {
    //     try {

    //     } catch(err) {
    //         throw(err);
    //     }
    // }

    static async store({assetId, amount} : {assetId: string, amount: number}){
        try {
            const asset = await AssetService.findById({id: assetId});

            const productId = await StoreService.buy({assetId: assetId, amount: amount});

            await OrderRepository.create({assetId: assetId, productId: productId, assetName: asset.name, assetPercent: asset.percent,
                                           assetPrice: asset.price, purchasePrice: amount, type: "buy"});

        } catch(err) {
            throw(err);
        } finally {

        }
    }

    static async sale({id, amount}: {id: string, amount: number}) {
        try {
            const asset = await AssetService.findById({id: id});

            const store = await StoreService.findById({id: id});

            await StoreService.sale({assetId: id, amount: amount});


            await OrderRepository.create({assetId: assetId, productId: productId, assetName: asset.name, assetPercent: asset.percent,
                assetPrice: asset.price, purchasePrice: amount, type: "buy"});

        } catch(err) {
            throw(err);
        } finally {

        }
    }
}