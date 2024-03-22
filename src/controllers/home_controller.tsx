import AssetsRepository from "../repositories/assets_repository";

export default class HomeController {
    async Index() {
        try {

            var assets = await AssetsRepository.list();

            console.log("assets:" + assets);
            return assets;
        } catch (err) {
            console.log(err);
        }
    }
}