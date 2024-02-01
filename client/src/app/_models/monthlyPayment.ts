export interface MonthlyPayment {
    userName: string
    rentalFee: number;
    lastRentalFee: number;
    payBill: boolean;
    paidThisMonth: boolean;
    waterBill: number;
    electricityBill: number;
    gasBill: number;
    totalMonthlyPayment: number;
}