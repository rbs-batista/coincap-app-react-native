import AssetRepository from "../repositories/asset_repository";
import StoreService from "../services/store_service";

export default class StoreController {
    static async index() {
        try {
            const stores = await StoreService.all();
            return stores;
        } catch (err) {
            throw(err);
        }
    }

    static async detail({ id }:{ id: string }) {
        try {
            const detail = await AssetRepository.findById({id: id});
            return detail;
        } catch(err) {
            throw(err);
        }
    }
}