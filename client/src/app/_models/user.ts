export interface User {
    userName: string;
    token: string;
    photoUrl: string;
    knownAs: string;
    gender: string;
    rentalFee: any;
    roles: string[];
    paidThisMonth: boolean;
    active: boolean;
}