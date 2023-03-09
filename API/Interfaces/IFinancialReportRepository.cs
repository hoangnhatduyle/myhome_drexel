using API.DTOs;
using API.Entities;

namespace API.Interfaces
{
    public interface IFinancialReportRepository
    {
        Task<IEnumerable<FinancialReport>> GetAllFinancialReports();
        Task<IEnumerable<FinancialReport>> GetFinancialReportsByYear(int year);
        Task AddNewFinancialReport(FinancialReportDto financialReportDto);
    }
}