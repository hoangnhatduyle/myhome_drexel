import { MonthlyPayment } from "./monthlyPayment";

export interface User {
    userName: string;
    token: string;
    photoUrl: string;
    knownAs: string;
    roles: string[];
    active: boolean;
    email: string;
    leaseStart: Date;
    leaseEnd: Date;
    notes: string;
    monthlyPayment: MonthlyPayment;
}