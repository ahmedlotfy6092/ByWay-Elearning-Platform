using AutoMapper;
using Byway.Application.DTOs;
using Byway.Application.Interfaces;
using Byway.Domain.Models;
using Byway.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using System.Text.Json;
namespace Byway.Infrastructure.Services
{
    public class OrderService : IOrderService
    {
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;

        public OrderService(ApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<OrderDto> CreateOrderAsync(string userId, CheckoutDto checkout)
        {
            var cart = await _context.Carts
                .Include(c => c.Course)
                .Where(c => c.UserId == userId)
                .ToListAsync();

            if (!cart.Any())
                throw new InvalidOperationException("Cart is empty");

            var courses = cart.Select(c => c.Course).ToList();
            var totalPrice = courses.Sum(c => c.DiscountPrice ?? c.Price);
            var tax = totalPrice * 0.15m;

            var order = new Order
            {
                UserId = userId,
                CourseIds = JsonSerializer.Serialize(courses.Select(c => c.Id)),
                TotalPrice = totalPrice,
                Tax = tax,
                PaymentDetails = JsonSerializer.Serialize(checkout),
                CreatedAt = DateTime.UtcNow
            };

            _context.Orders.Add(order);
            await _context.SaveChangesAsync();

            var orderDto = _mapper.Map<OrderDto>(order);
            orderDto.Courses = _mapper.Map<List<CourseDto>>(courses);

            return orderDto;
        }

        public async Task<int> GetMonthlySubscriptionsAsync(DateTime startDate)
        {
            return await _context.Orders
                .Where(o => o.CreatedAt >= startDate)
                .CountAsync();
        }

        public async Task<List<OrderDto>> GetUserOrdersAsync(string userId)
        {
            var orders = await _context.Orders
                .Where(o => o.UserId == userId)
                .OrderByDescending(o => o.CreatedAt)
                .ToListAsync();

            var orderDtos = _mapper.Map<List<OrderDto>>(orders);

            foreach (var orderDto in orderDtos)
            {
                var courseIds = JsonSerializer.Deserialize<List<int>>(orderDto.CourseIds);
                var courses = await _context.Courses
                    .Where(c => courseIds.Contains(c.Id))
                    .ToListAsync();

                orderDto.Courses = _mapper.Map<List<CourseDto>>(courses);
            }

            return orderDtos;
        }

        public async Task<OrderDetailsDto> GetOrderDetailsAsync(int orderId, string userId)
        {
            var order = await _context.Orders
                .FirstOrDefaultAsync(o => o.Id == orderId && o.UserId == userId);

            if (order == null)
                throw new InvalidOperationException("Order not found");

            var courseIds = JsonSerializer.Deserialize<List<int>>(order.CourseIds);
            var courses = await _context.Courses
                .Where(c => courseIds.Contains(c.Id))
                .ToListAsync();

            return new OrderDetailsDto
            {
                Id = order.Id,
                Courses = _mapper.Map<List<CourseDto>>(courses),
                SubTotal = order.TotalPrice,
                Tax = order.Tax,
                Total = order.TotalPrice + order.Tax,
                OrderDate = order.CreatedAt
            };
        }
    }
}
