export interface Payment {
    id: number
    username: string;
    email: string;
    paymentStatus: string;
    method: string;
    payDate: Date;
    amount: number;
    payMonth: number;
}