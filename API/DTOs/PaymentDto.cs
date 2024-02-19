namespace API.DTOs
{
    public class PaymentDto
    {
        public int Id { get; set; }
        public string Method { get; set; }
        public DateOnly PayDate { get; set; }
        public int PayMonth { get; set; }
        public string PaymentStatus { get; set; }
        public double Amount { get; set; }
    }
}