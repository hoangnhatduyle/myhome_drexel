namespace API.DTOs
{
    public class MessageDto
    {
        public string Subject { get; set; }
        public DateTime SentDate { get; set; } = DateTime.UtcNow;
        public string Content { get; set; }
    }
}