using API.DTOs;
using API.Entities;

namespace API.Interfaces
{
    public interface IPaymentRepository
    {
        Task<IEnumerable<PaymentForApprovalDto>> GetUnapprovedPayment();
        Task<IEnumerable<PaymentForApprovalDto>> GetPastPayment();
        Task<Payment> GetPaymentById(int paymentId);
        void RemovePayment(Payment payment);
    }
}