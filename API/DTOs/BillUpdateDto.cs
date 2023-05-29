namespace API.DTOs
{
    public class BillUpdateDto
    {
        public int Amount { get; set; }
        public string[] Usernames { get; set; }  
        public DateOnly DueDate { get; set; }    
        public DateOnly PaidDate { get; set; }    
    }
}