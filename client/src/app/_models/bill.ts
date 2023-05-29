export interface Bill {
    id: number
    type: string;
    month: number;
    amount: number;
    paid: boolean;
    dueDate: Date;
    paidDate: Date;
}