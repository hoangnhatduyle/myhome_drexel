namespace API.Entities
{
    public class Bills
    {
        public Bills()
        {

        }
        public Bills(int id, string type, int month, int amount)
        {
            Id = id;
            Type = type;
            Month = month;
            Amount = amount;
        }

        public int Id { get; set; }
        public string Type { get; set; }
        public int Month { get; set; }
        public double Amount { get; set; }
        public bool Paid { get; set; }  
        public DateOnly DueDate { get; set; }    
        public DateOnly PaidDate { get; set; }
    }
}