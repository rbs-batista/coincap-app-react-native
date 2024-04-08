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
}