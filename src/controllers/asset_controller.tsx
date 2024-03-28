import AssetRepository from "../repositories/asset_repository";

export default class AssetController {
    async Index() {
        try {

            const assets = await AssetRepository.all();

            return assets;
        } catch (err) {
            console.log(err);
        }
    }

    async Detail({ id }:{ id: string }) {
        try {
            const detail = await AssetRepository.findById({ id: id });

            return detail;
        } catch(err) {
            console.log(err);
        }
    }
}