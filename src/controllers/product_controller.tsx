import StoreService from "../services/store_service";

export default class ProductController {
    async all() {
        try {
            return await StoreService.all();
        } catch (err) {
            throw(err);
        }
    }
}