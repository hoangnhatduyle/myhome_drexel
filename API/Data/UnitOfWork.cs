using API.Interfaces;
using AutoMapper;

namespace API.Data
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public UnitOfWork(DataContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;
            
        }
        public IUserRepository UserRepository => new UserRepository(_context, _mapper);
        public IPhotoRepository PhotoRepository => new PhotoRepository(_context);
        public IBillRepository BillRepository => new BillsRepository(_context);
        public IPaymentRepository PaymentRepository => new PaymentRepository(_context, _mapper);

        public async Task<bool> Complete()
        {
            return await _context.SaveChangesAsync() > 0;
        }

        public bool HasChanges()
        {
            return _context.ChangeTracker.HasChanges();
        }
    }
}