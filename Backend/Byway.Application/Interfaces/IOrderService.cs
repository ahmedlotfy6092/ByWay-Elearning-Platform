using Byway.Application.DTOs;

namespace Byway.Application.Interfaces
{
    public interface IOrderService
    {
        Task<OrderDto> CreateOrderAsync(string userId, CheckoutDto checkout);
        Task<int> GetMonthlySubscriptionsAsync(DateTime startDate);
        Task<List<OrderDto>> GetUserOrdersAsync(string userId);
        Task<OrderDetailsDto> GetOrderDetailsAsync(int orderId, string userId);
    }
}
