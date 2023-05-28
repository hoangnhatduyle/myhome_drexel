using API.Entities;

namespace API.DTOs
{
    public class MemberDto
    {
        public int Id { get; set; }
        public string UserName { get; set; }
        public string PhotoUrl { get; set; }
        public int Age { get; set; }
        public string KnownAs { get; set; }
        public DateTime Created { get; set; }
        public DateTime LastActive { get; set; }
        public string Gender { get; set; }
        public string Introduction { get; set; }
        public string City { get; set; }
        public string Country { get; set; }
        public List<PhotoDto> Photos { get; set; }
        public List<PaymentDto> Payment { get; set; }
        public List<MessageDto> Messages { get; set; }
        public DateOnly LeaseEnd { get; set; }
        public string Address { get; set; }
        public int RentalFee { get; set; }
        public int LastRentalFee { get; set; }
        public string PhoneNumber { get; set; }
        public string Email { get; set; }
        public Room Room { get; set; }
        public bool PaidThisMonth { get; set; }
        public bool Active { get; set; }
    }
}