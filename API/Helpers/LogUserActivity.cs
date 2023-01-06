using API.Extensions;
using API.Interfaces;
using Microsoft.AspNetCore.Mvc.Filters;

namespace API.Helpers
{
    public class LogUserActivity : IAsyncActionFilter
    {
        public async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
        {
            var resultContext = await next();

            if (!resultContext.HttpContext.User.Identity.IsAuthenticated) return;

            var userID = resultContext.HttpContext.User.GetUserID();

            var unitOfWork = resultContext.HttpContext.RequestServices.GetRequiredService<IUnitOfWork>();
            var user = await unitOfWork.UserRepository.GetUserByIdAsync(userID);
            user.LastActive = DateTime.UtcNow;

            await unitOfWork.Complete();
        }
    }
}