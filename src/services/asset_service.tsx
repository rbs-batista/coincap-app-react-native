import AssetRepository from "../repositories/asset_repository";
export default class AssetService {

    static async all () {
        return AssetRepository.all();
    }

    static async findById({id}:{id: string}) {
        console.log(`4[AssetService][req][findById]id:${id}`);
        const asset = AssetRepository.findById({id});
        console.log(`4[AssetService][req][findById]id:${id}`);
        
        return asset;
    }

    static async findByIdAndInterval({id, interval}:{id: string, interval: string}) {
        return AssetRepository.findByIdAndInterval({id, interval});
    }
}