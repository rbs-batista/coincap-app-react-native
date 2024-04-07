import { AssetModel } from "../models";
import AssetRepository from "../repositories/asset_repository";

export default class AssetController {
    static async index() {
        try {
            const assets = await AssetRepository.all();
            return assets;
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