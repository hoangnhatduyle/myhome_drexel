namespace API.Interfaces
{
    public interface IUnitOfWork
    {
        IUserRepository UserRepository { get; }
        IPhotoRepository PhotoRepository { get; }
        IBillRepository BillRepository { get; }
        IPaymentRepository PaymentRepository { get; }
        IFinancialReportRepository FinancialReportRepository { get; }
        Task<bool> Complete();
        bool HasChanges();
    }
}