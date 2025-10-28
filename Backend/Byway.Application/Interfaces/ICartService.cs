using Byway.Application.DTOs;

namespace Byway.Application.Interfaces
{
    public interface ICartService
    {
        Task<CartDto> GetUserCartAsync(string userId);
        Task AddToCartAsync(string userId, int courseId);
        Task RemoveFromCartAsync(string userId, int courseId);
        Task ClearCartAsync(string userId);
    }
}
