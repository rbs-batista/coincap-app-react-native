import BaasService from "../services/baas_service";

export default class BaasController {
    static async balance () {
        try {
            const balance = await BaasService.getBalance();
            return balance;
        } catch(err) {
            throw(err);
        }
    }

    static async credit ({amount}:{amount: number}) {
        try {
            return await BaasService.credit({amount: amount});
        } catch(err) {
            throw(err);
        }
    }

    static async debit ({amount}:{amount: number}) {
        try {
            return await BaasService.debit({amount: amount});
        } catch(err) {
            throw(err);
        }
    }
}