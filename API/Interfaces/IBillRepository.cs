using API.Entities;

namespace API.Interfaces
{
    public interface IBillRepository
    {
        Task<IEnumerable<Bills>> GetAllBils();
        Task<Bills> GetBill(int id);
        Task<IEnumerable<Bills>> GetBillsByType(string type);
        void RemoveBill(Bills bill);
    }
}