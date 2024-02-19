using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities
{
    [Table("MonthlyPayment")]
    public class MonthlyPayment
    {
        public int Id { get; set; }
        public string UserName { get; set; }
        public double RentalFee { get; set; }
        public double LastRentalFee { get; set; }
        public bool PayBill { get; set; }
        public bool PaidThisMonth { get; set; }
        public bool PayRent { get; set; }
        public double WaterBill { get; set; }
        public double ElectricityBill { get; set; }
        public double GasBill { get; set; }
        public double TotalMonthlyPayment { get; set; }
    }
}