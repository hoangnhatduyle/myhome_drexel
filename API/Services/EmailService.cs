using API.Entities;
using API.Entities.Email;
using API.Interfaces;
using MailKit.Net.Smtp;
using MimeKit;

namespace API.Services
{
    public class EmailService : IEmailService
    {
        private readonly EmailConfiguration _emailConfig;
        public EmailService(EmailConfiguration emailConfig) => _emailConfig = emailConfig;
        public void SendEmail(EmailMessage emailMessage)
        {
            var sendingEmailMessage = CreateEmailMessage(emailMessage);
            Send(sendingEmailMessage);
        }

        private MimeMessage CreateEmailMessage(EmailMessage emailMessage)
        {
            var fileName = "./Data/logo.png";
            byte[] fileContent = File.ReadAllBytes(fileName);
            string base64 = Convert.ToBase64String(fileContent);

            var mailMessage = new MimeMessage();
            mailMessage.From.Add(new MailboxAddress("myHome Customer Support", _emailConfig.From));
            mailMessage.To.AddRange(emailMessage.To);
            mailMessage.Subject = emailMessage.Subject;
            // mailMessage.Body = new TextPart(MimeKit.Text.TextFormat.Html) { Text = $"{emailMessage.Content}" };
            mailMessage.Body = new TextPart(MimeKit.Text.TextFormat.Html) { Text = $"<div style='width: 40%; display: flex; justify-content: center; margin: auto; color: black;'><div><div style='display: flex; padding-top: 20px;'><img style='max-height: 30px; margin-right: auto;' src='https://drive.google.com/uc?export=view&id=1xzzz5GlCCovVVRZ4cTxxgRTR2Bea5P4S'><span style='font-size: 18px; font-weight: bold;'>Password Assistance</span></div><hr><div>To authenticate, please use the following token:</div><div style='margin-top: 20px; margin-bottom: 20px; padding: 5px 5px; border: 0.5px solid gray;'>{emailMessage.Content}</div><div>This code will expire in 1 hour. Don't share this token with anyone. If you didn't mean to reset your password, then you can just ignore this email, your password will not change.</div><br><div>Any questions? Shoot us a message at lehoangnhatduy2000@gmail.com</div></div></div>" };

            return mailMessage;
        }

        private void Send(MimeMessage mailMessage)
        {
            using var client = new SmtpClient();
            try
            {
                client.Connect(_emailConfig.SmtpServer, _emailConfig.Port, true);
                client.AuthenticationMechanisms.Remove("XOAUTH2");
                client.Authenticate(_emailConfig.UserName, _emailConfig.Password);

                client.Send(mailMessage);
            }
            catch
            {
                throw;
            }
            finally
            {
                client.Disconnect(true);
                client.Dispose();
            }
        }
    }
}