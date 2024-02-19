namespace API.DTOs
{
    public class BillUpdateDto
    {
        public double Amount { get; set; }
        public string Type { get; set; }
        public DateOnly DueDate { get; set; }    
        public DateOnly PaidDate { get; set; }    
    }
}