using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities
{
    [Table("MonthlyPayment")]
    public class MonthlyPayment
    {
        public int Id { get; set; }
        public string UserName { get; set; }
        public int RentalFee { get; set; }
        public int LastRentalFee { get; set; }
        public bool PayBill { get; set; }
        public bool PaidThisMonth { get; set; }
        public int WaterBill { get; set; }
        public int ElectricityBill { get; set; }
        public int GasBill { get; set; }
        public int TotalMonthlyPayment { get; set; }
    }
}