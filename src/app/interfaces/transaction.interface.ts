export interface Transaction {
    id?: string;
    title: string;
    sum: number;
    type: 'income' | 'expense';
    date: Date;
    userId?: string;
}

// export enum TransactionType {
//     income = 0,
//     expense = 1
// }