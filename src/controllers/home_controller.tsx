import AssetsRepository from "../repositories/assets_repository";

export default class HomeController {
    async Index() {
        try {
            return await AssetsRepository.list();
        } catch (err) {
            console.log(err);
        }
    }
}