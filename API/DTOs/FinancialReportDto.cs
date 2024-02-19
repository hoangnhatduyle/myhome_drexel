namespace API.DTOs
{
    public class FinancialReportDto
    {
        public int Month { get; set; }
        public int Year { get; set; }
        public double TotalIncome { get; set; }
        public double TotalOutcome { get; set; }
        public double NetIncome { get; set; }
        public double WaterBill { get; set; }
        public double ElectricityBill { get; set; }
        public double GasBill { get; set; }
        public double MobileBill { get; set; }
        public double InternetBill { get; set; }
        public double InsuranceBill { get; set; }
        public double OwedWaterBill { get; set; }
    }
}