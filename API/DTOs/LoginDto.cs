namespace API.DTOs
{
    public class LoginDto
    {
        public string UserName { get; set; }
        public string Password { get; set; }
        public bool Remember { get; set; }
    }
}