using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities
{
    [Table("FinancialReport")]
    public class FinancialReport
    {
        public int Id { get; set; }
        public int Month { get; set; }
        public int Year { get; set; }
        public int TotalIncome { get; set; }
        public int TotalOutcome { get; set; }
        public int NetIncome { get; set; }
        public int WaterBill { get; set; }
        public int ElectricityBill { get; set; }
        public int GasBill { get; set; }
        public int MobileBill { get; set; }
        public int InternetBill { get; set; }
        public int InsuranceBill { get; set; }
        public int OwedWaterBill { get; set; }
    }
}