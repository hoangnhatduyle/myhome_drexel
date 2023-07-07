using API.DTOs;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class PaymentRepository : IPaymentRepository
    {private readonly DataContext _context;
        private readonly IMapper _mapper;
        public PaymentRepository(DataContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;            
        }
        public async Task<Payment> GetPaymentById(int paymentId)
        {
            return await _context.Payments.IgnoreQueryFilters().SingleOrDefaultAsync(p => p.Id == paymentId);
        }

        public async Task<IEnumerable<PaymentForApprovalDto>> GetUnapprovedPayment()
        {
           return await _context.Payments.Where(p => p.PaymentStatus == "Pending").Select(u => new PaymentForApprovalDto
            {
                Id = u.Id,
                Username = u.AppUser.UserName,              
                PaymentStatus = u.PaymentStatus,
                Email = u.AppUser.Email,
                Method = u.Method,
                Amount = u.Amount,
                PayDate = u.PayDate,
                PayMonth = u.PayMonth
            }).ToListAsync();
        }

        public async Task<IEnumerable<PaymentForApprovalDto>> GetPastPayment()
        {
           return await _context.Payments.Where(p => p.PaymentStatus != "Pending").Select(u => new PaymentForApprovalDto
            {
                Id = u.Id,
                Username = u.AppUser.UserName,              
                PaymentStatus = u.PaymentStatus,
                Email = u.AppUser.Email,
                Method = u.Method,
                Amount = u.Amount,
                PayDate = u.PayDate,
                PayMonth = u.PayMonth
            }).ToListAsync();
        }

        public void RemovePayment(Payment payment)
        {
            _context.Payments.Remove(payment);
        }
    }
}