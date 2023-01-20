using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities
{
    [Table("Rooms")]
    public class Room
    {
        public int Id { get; set; }
        public int RoomNumber { get; set; }
        public string RoomType { get; set; }
        public bool IsOccupied { get; set; }
    }
}