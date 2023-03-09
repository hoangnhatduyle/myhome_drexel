export interface FinancialReport {
    id?: number;
    month: number;
    year: number;
    totalIncome: number;
    totalOutcome: number;
    netIncome: number;
    waterBill: number;
    electricityBill: number;
    gasBill: number;
    mobileBill: number;
    internetBill: number;
    insuranceBill: number;
    owedWaterBill: number;
}