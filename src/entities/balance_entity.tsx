import { Money } from "../helpers";

export class BalanceEntity{
    amount: number;

    constructor(
        {amount}: 
        {amount: number}
    ) {
        this.amount = Money.format({value: amount});
    }
}