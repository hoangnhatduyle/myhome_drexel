namespace API.DTOs
{
    public class PaymentForApprovalDto
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public string Email { get; set; }
        public string PaymentStatus { get; set; }
        public string Method { get; set; }
        public int PayMonth { get; set; }
        public DateOnly PayDate { get; set; }
        public double Amount { get; set; }
    }
}