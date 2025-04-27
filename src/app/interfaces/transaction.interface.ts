export class Transaction {
    title: string;
    sum: number;
    type: TransactionTypes;

    constructor (transaction: ITransactionData) {
        this.title = transaction.title,
        this.type = transaction.type,
        this.sum = transaction.sum
    }
}

export enum TransactionTypes {
    dohod = 0,
    rashod = 1
}

export interface ITransactionData {
    title: string;
    type: TransactionTypes,
    sum: number
}