using System.Security.Claims;

namespace Byway.Application.Interfaces
{
    public interface ITokenService
    {
        string CreateToken(IEnumerable<Claim> claims);
        ClaimsPrincipal GetPrincipalFromExpiredToken(string token);
    }
}
