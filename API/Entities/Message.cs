using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities
{
    [Table("Message")]
    public class Message
    {
        public int Id { get; set; }
        public string Subject { get; set; }
        public DateTime SentDate { get; set; }
        public string Content { get; set; }
        public int AppUserId { get; set; }
        public AppUser AppUser { get; set; }
    }
}