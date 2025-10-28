using AutoMapper;
using Byway.Application.DTOs;
using Byway.Application.Interfaces;
using Byway.Domain.Models;
using Byway.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace Byway.Infrastructure.Services
{
    public class CartService : ICartService
    {
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;

        public CartService(ApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<CartDto> GetUserCartAsync(string userId)
        {
            var cartItems = await _context.Carts
                .Include(c => c.Course)
                .Where(c => c.UserId == userId)
                .ToListAsync();

            var dto = new CartDto
            {
                Items = _mapper.Map<List<CartItemDto>>(cartItems),
                SubTotal = cartItems.Sum(c => c.Course.DiscountPrice ?? c.Course.Price)
            };

            dto.Tax = Math.Round(dto.SubTotal * 0.15m, 2);
            dto.Total = dto.SubTotal + dto.Tax;

            return dto;
        }

        public async Task AddToCartAsync(string userId, int courseId)
        {
            var existingItem = await _context.Carts
                .FirstOrDefaultAsync(c => c.UserId == userId && c.CourseId == courseId);

            if (existingItem != null)
                throw new InvalidOperationException("Course is already in cart");

            var course = await _context.Courses.FindAsync(courseId);
            if (course == null)
                throw new InvalidOperationException("Course not found");

            var cart = new Cart
            {
                UserId = userId,
                CourseId = courseId,
                CreatedAt = DateTime.UtcNow

            };

            _context.Carts.Add(cart);
            await _context.SaveChangesAsync();
        }

        public async Task RemoveFromCartAsync(string userId, int courseId)
        {
            var cartItem = await _context.Carts
                .FirstOrDefaultAsync(c => c.UserId == userId && c.CourseId == courseId);

            if (cartItem == null)
                throw new InvalidOperationException("Item not found in cart");

            _context.Carts.Remove(cartItem);
            await _context.SaveChangesAsync();
        }

        public async Task ClearCartAsync(string userId)
        {
            var cartItems = await _context.Carts
                .Where(c => c.UserId == userId)
                .ToListAsync();

            _context.Carts.RemoveRange(cartItems);
            await _context.SaveChangesAsync();
        }
    }
}
