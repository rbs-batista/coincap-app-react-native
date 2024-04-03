import BaasService from "../services/baas_service";

export default class BaasController {
    static async balance () {
        try {
            console.log(`2[BaasController][req][balance]getBalance`);
            const balance = await BaasService.getBalance();
            console.log(`2[BaasController][res][balance]getBalance: ${JSON.stringify(balance)}`);
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