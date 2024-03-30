import AssetRepository from "../repositories/asset_repository";
export default class AssetService {

    static async all () {
        return AssetRepository.all();
    }

    static async findById({id}:{id: string}) {
        return AssetRepository.findById({id});
    }

    static async findByIdAndInterval({id, interval}:{id: string, interval: string}) {
        return AssetRepository.findByIdAndInterval({id, interval});
    }
}