using API.Entities.Email;

namespace API.Interfaces
{
    public interface IEmailService
    {
        void SendEmail(EmailMessage emailMessage);
        
    }
}