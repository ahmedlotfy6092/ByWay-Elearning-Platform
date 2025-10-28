using System.Security.Claims;
using Byway.Application.DTOs;
using Byway.Application.Interfaces;
using Byway.Domain.Models;
using Microsoft.AspNetCore.Identity;

namespace Byway.Infrastructure.Services
{
    public class AuthService : IAuthService
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly ITokenService _tokenService;

        public AuthService(UserManager<ApplicationUser> userManager, ITokenService tokenService)
        {
            _userManager = userManager;
            _tokenService = tokenService;
        }

        public async Task<AuthResponseDto> LoginAsync(string email, string password)
        {
            var user = await _userManager.FindByEmailAsync(email);
            if (user == null || !await _userManager.CheckPasswordAsync(user, password))
            {
                throw new UnauthorizedAccessException("Invalid email or password");
            }

            var roles = await _userManager.GetRolesAsync(user);
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.Email, user.Email!),
                new Claim(ClaimTypes.Name, user.UserName!),
                new Claim(ClaimTypes.Role, roles.First())
            };

            return new AuthResponseDto
            {
                Token = _tokenService.CreateToken(claims),
                Email = user.Email!,
                Role = roles.First()
            };
        }

        public async Task<AuthResponseDto> RegisterAsync(string email, string password, string firstName, string lastName)
        {
            var existingUser = await _userManager.FindByEmailAsync(email);
            if (existingUser != null)
            {
                throw new InvalidOperationException("User already exists");
            }

            var user = new ApplicationUser
            {
                UserName = email,
                Email = email,
                FirstName = firstName,
                LastName = lastName,
                CreatedAt = DateTime.UtcNow
            };

            var result = await _userManager.CreateAsync(user, password);
            if (!result.Succeeded)
            {
                throw new InvalidOperationException(
                    $"Failed to create user: {string.Join(", ", result.Errors.Select(e => e.Description))}");
            }

            await _userManager.AddToRoleAsync(user, "User");

            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.Email, user.Email!),
                new Claim(ClaimTypes.Name, user.UserName!),
                new Claim(ClaimTypes.Role, "User")
            };

            return new AuthResponseDto
            {
                Token = _tokenService.CreateToken(claims),
                Email = user.Email!,
                Role = "User"
            };
        }

        public async Task<bool> ValidateTokenAsync(string token)
        {
            try
            {
                var principal = _tokenService.GetPrincipalFromExpiredToken(token);
                var email = principal.FindFirstValue(ClaimTypes.Email);
                var user = await _userManager.FindByEmailAsync(email!);
                return user != null;
            }
            catch
            {
                return false;
            }
        }
    }
}
