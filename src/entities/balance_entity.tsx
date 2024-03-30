export class BalanceEntity{
    amount: number;

    constructor(
        {amount}: 
        {amount: number}
    ) {
        this.amount = amount
    }
}