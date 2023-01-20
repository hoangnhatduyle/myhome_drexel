namespace API.Interfaces
{
    public interface IUnitOfWork
    {
        IUserRepository UserRepository { get; }
        IPhotoRepository PhotoRepository { get; }
        IBillRepository BillRepository { get; }
        IPaymentRepository PaymentRepository { get; }
        Task<bool> Complete();
        bool HasChanges();
    }
}