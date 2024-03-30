import BaasRepository from "../repositories/baas_repository";
export default class BaasService {
    
    static async getBalance() {
        try{ 
            return BaasRepository.getBalance();
        } catch (err) {
            throw(err);
        }
    }

    static async credit({amount}:{amount: number}) {
        try{ 
            var balance = await this.getBalance();
            const newAmount = balance.amount += amount; 

            await BaasRepository.updateBalance({amount: newAmount});
        } catch (err) {
            throw(err);
        }
    }

    static async debit({amount}:{amount: number}) {
        try{ 
            var balance = await this.getBalance();
            const newAmount = balance.amount -= amount; 

            await BaasRepository.updateBalance({amount: newAmount});
        } catch (err) {
            throw(err);
        }
    }
}