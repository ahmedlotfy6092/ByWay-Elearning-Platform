using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Byway.Application.Interfaces;
using System.Security.Claims;

namespace Byway.API.Controllers
{
    //[Authorize]
    [Route("api/user/cart")]
    [ApiController]
    public class CartController : ControllerBase
    {
        private readonly ICartService _cartService;

        public CartController(ICartService cartService)
        {
            _cartService = cartService;
        }

        [HttpGet]
        public async Task<IActionResult> GetUserCart()
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            var cart = await _cartService.GetUserCartAsync(userId);
            return Ok(cart);
        }

        [HttpPost("add/{courseId}")]
        public async Task<IActionResult> AddToCart(int courseId)
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            await _cartService.AddToCartAsync(userId, courseId);
            return Ok();
        }

        [HttpDelete("{courseId}")]
        public async Task<IActionResult> RemoveFromCart(int courseId)
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            await _cartService.RemoveFromCartAsync(userId, courseId);
            return Ok();
        }
    }
}
