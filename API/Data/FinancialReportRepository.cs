using API.DTOs;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class FinancialReportRepository : IFinancialReportRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public FinancialReportRepository(DataContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;
        }

        public async Task AddNewFinancialReport(FinancialReportDto financialReportDto)
        {
            var newReport = new FinancialReport();
            _mapper.Map(financialReportDto, newReport);

            await _context.FinancialReports.AddAsync(newReport);
            
            return;
        }

        public async Task<IEnumerable<FinancialReport>> GetAllFinancialReports()
        {
            return await _context.FinancialReports.ToListAsync();
        }

        public async Task<IEnumerable<FinancialReport>> GetFinancialReportsByYear(int year)
        {
            return await _context.FinancialReports.Where(x => x.Year == year).ToListAsync();
        }
    }
}