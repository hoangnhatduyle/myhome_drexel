using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities
{
    [Table("Payment")]
    public class Payment
    {
        public int Id { get; set; }
        public string Method { get; set; }
        public DateOnly PayDate { get; set; }
        public int PayMonth { get; set; }
        public string PaymentStatus { get; set; }
        public int Amount { get; set; }
        public int AppUserId { get; set; }
        public AppUser AppUser { get; set; }
    }
}