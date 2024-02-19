using API.DTOs;
using API.Entities;
using API.Helpers;
using API.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class UserRepository : IUserRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public UserRepository(DataContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;
        }

        public async Task<MemberDto> GetMemberByUsernameAsync(string username, bool isCurrentUser)
        {
            var query = _context.Users.Where(user => user.UserName == username)
                .ProjectTo<MemberDto>(_mapper.ConfigurationProvider).AsQueryable();

            if (isCurrentUser) query = query.IgnoreQueryFilters();

            return await query.AsSplitQuery().FirstOrDefaultAsync();
        }

        public async Task<PagedList<MemberDto>> GetMembersAsync(UserParams userParams)
        {
            // var query = _context.Users.ProjectTo<MemberDto>(_mapper.ConfigurationProvider).AsNoTracking();
            var query = _context.Users.AsQueryable();
            query = query.Where(u => u.UserName != userParams.CurrentUsername);

            query = userParams.OrderBy switch
            {
                "created" => query.OrderByDescending(u => u.Created),
                _ => query.OrderByDescending(u => u.Room.RoomNumber)
            };

            return await PagedList<MemberDto>
                                            .CreateAsync(query.ProjectTo<MemberDto>(_mapper.ConfigurationProvider).AsSplitQuery().AsNoTracking(),
                                                        userParams.PageNumber,
                                                        userParams.PageSize);
        }

        public async Task<AppUser> GetUserByIdAsync(int id)
        {
            return await _context.Users.FindAsync(id);
        }

        public async Task<AppUser> GetUserByPhotoIdAsync(int photoId)
        {
            return await _context.Users.Include(p => p.Photos).IgnoreQueryFilters().Where(x => x.Photos.Any(p => p.Id == photoId)).FirstOrDefaultAsync();
        }

        public async Task<AppUser> GetUserByPaymentIdAsync(int paymentId)
        {
            return await _context.Users.Include(p => p.Photos).Where(x => x.Payment.Any(p => p.Id == paymentId)).FirstOrDefaultAsync();
        }

        public async Task<AppUser> GetUserByUsernameAsync(string username)
        {
            return await _context.Users.Include(p => p.Photos).FirstOrDefaultAsync(x => x.UserName == username);
        }

        public async Task<string> GetUserGender(string username)
        {
            return await _context.Users.Where(x => x.UserName == username).Select(x => x.Gender).FirstOrDefaultAsync();
        }

        public async Task<IEnumerable<AppUser>> GetUsersAsync()
        {
            return await _context.Users.Include(p => p.Photos).ToListAsync();
        }

        // public async Task<bool> SaveAllAsync()
        // {
        //     return await _context.SaveChangesAsync() > 0;
        // }

        public void Update(AppUser user)
        {
            _context.Entry(user).State = EntityState.Modified;
        }

        public async Task UpdatePaidThisMonth()
        {
            List<AppUser> users = await _context.Users.Include(x => x.MonthlyPayment).ToListAsync();
            foreach (AppUser user in users)
            {
                user.MonthlyPayment.PaidThisMonth = false;
                user.MonthlyPayment.LastRentalFee = user.MonthlyPayment.TotalMonthlyPayment;

                //reset total monthly payment to only room fee
                user.MonthlyPayment.TotalMonthlyPayment = user.MonthlyPayment.RentalFee;
                user.MonthlyPayment.WaterBill = 0;
                user.MonthlyPayment.ElectricityBill = 0;
                user.MonthlyPayment.GasBill = 0;
            }
            return;
        }

        public async Task UpdateBillsThisMonth(string type, double amount)
        {
            List<AppUser> users = await _context.Users.Include(x => x.MonthlyPayment).Where(x => x.MonthlyPayment.PayBill).ToListAsync();
            int numberOfUsersPaidBill = users.Count;

            foreach (AppUser user in users)
            {
                if (type == "water")
                {
                    user.MonthlyPayment.WaterBill = amount / numberOfUsersPaidBill;
                }
                else if (type == "gas")
                {
                    user.MonthlyPayment.GasBill = amount / numberOfUsersPaidBill;
                }
                else if (type == "electricity")
                {
                    user.MonthlyPayment.ElectricityBill = amount / numberOfUsersPaidBill;
                }
                
                user.MonthlyPayment.TotalMonthlyPayment += amount / numberOfUsersPaidBill;
            }
            return;
        }
    }
}