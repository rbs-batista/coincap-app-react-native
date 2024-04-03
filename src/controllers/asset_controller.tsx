import { AssetModel } from "../models";
import AssetRepository from "../repositories/asset_repository";

export default class AssetController {
    static async index() {
        try {
            console.log(`2[List][req][index]all`);
            const assets = await AssetRepository.all();
            console.log(`2[List][res][index]all`);
            return assets;
        } catch (err) {
            throw(err);
        }
    }

    static async detail({ id }:{ id: string }) {
        try {
            console.log(`2[AssetController][req][detail]id: ${id}`);
            const detail = await AssetRepository.findById({id: id});
            console.log(`2[AssetController][res][detail]detail: ${JSON.stringify(detail)}`);
            return detail;
        } catch(err) {
            throw(err);
        }
    }
}