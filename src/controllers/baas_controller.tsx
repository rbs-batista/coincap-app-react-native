import BaasService from "../services/baas_service";

export default class BaasController {
    async balance () {
        try {
            return await BaasService.getBalance();
        } catch(err) {
            throw(err);
        }
    }
}