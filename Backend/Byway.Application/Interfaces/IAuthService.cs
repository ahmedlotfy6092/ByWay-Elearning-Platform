using Byway.Application.DTOs;

namespace Byway.Application.Interfaces
{
    public interface IAuthService
    {
        Task<AuthResponseDto> LoginAsync(string email, string password);
        Task<AuthResponseDto> RegisterAsync(string email, string password, string firstName, string lastName);
        Task<bool> ValidateTokenAsync(string token);
    }
}
