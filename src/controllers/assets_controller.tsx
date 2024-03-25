import AssetsRepository from "../repositories/assets_repository";

export default class AssetsController {
    async Index() {
        try {

            const assets = await AssetsRepository.list();

            return assets;
        } catch (err) {
            console.log(err);
        }
    }

    async Detail({id}:{id: string}) {
        try {
            const detail = await AssetsRepository.findById({id: id});

            return detail;
        } catch(err) {
            console.log(err);
        }
    }
}