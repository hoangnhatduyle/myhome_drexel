using API.Entities;
using API.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class BillsRepository : IBillRepository
    {
        private readonly DataContext _context;
        public BillsRepository(DataContext context)
        {
            _context = context;
        }
        public async Task<IEnumerable<Bills>> GetAllBils()
        {
            return await _context.Bills.ToListAsync();
        }

        public async Task<Bills> GetBill(int id)
        {
            return await _context.Bills.FindAsync(id);
        }

        public async Task<IEnumerable<Bills>> GetBillsByType(string type)
        {
            return await _context.Bills.Where(x => x.Type == type).ToListAsync();
        }

        public void RemoveBill(Bills bill)
        {
            _context.Bills.Remove(bill);
        }
    }
}