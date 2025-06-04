export interface Transaction {
    id?: string;
    title: string;
    sum: number;
    type: 'income' | 'expense';
    date: Date;
    userId?: string;
}