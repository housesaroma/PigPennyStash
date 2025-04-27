export class Transaction {
    title: string;
    sum: number;
    type: TransactionTypes;
    date: Date;

    constructor (transaction: ITransactionData) {
        this.title = transaction.title,
        this.type = transaction.type,
        this.sum = transaction.sum,
        this.date = new Date(transaction.date);
    }
}

export enum TransactionTypes {
    dohod = 0,
    rashod = 1
}

export interface ITransactionData {
    title: string;
    type: TransactionTypes,
    sum: number,
    date: Date
}