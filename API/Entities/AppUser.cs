using System.ComponentModel.DataAnnotations;
using API.Extensions;
using Microsoft.AspNetCore.Identity;

namespace API.Entities
{
    public class AppUser : IdentityUser<int>
    {
        public DateOnly DateOfBirth { get; set; }
        public DateOnly LeaseEnd { get; set; }
        public string KnownAs { get; set; }
        public DateTime Created { get; set; } = DateTime.UtcNow;
        public string Gender { get; set; }
        public string Introduction { get; set; }
        public string City { get; set; }
        public string Country { get; set; }
        public string Address { get; set; }
        public int RentalFee { get; set; }
        public int LastRentalFee { get; set; }
        public List<Photo> Photos { get; set; } = new();
        public List<Payment> Payment { get; set; } = new();
        public List<Message> Messages { get; set; } = new();
        public ICollection<AppUserRole> UserRoles { get; set; }
        public int? RoomId { get; set; }
        public virtual Room Room { get; set; }
        public bool PaidThisMonth { get; set; }
        public bool Active { get; set; }
        public bool PayBill { get; set; }
    }
}