using API.DTOs;
using API.Entities;
using API.Helpers;

namespace API.Interfaces
{
    public interface ILikesRepository
    {
        Task<UserLike> GetUserLike(int sourceUserId, int targetUserId); //get a UserLike entity based on 2 IDs
        Task<AppUser> GetUserWithLikes(int userId);     //get current user with list of liked users
        Task<PagedList<LikeDto>> GetUserLikes(LikesParams likesParams);      //find liked by users by current user
                                                                                    //or find users that like current user
    }
}