using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Byway.Application.Interfaces;
using System.Security.Claims;

namespace Byway.API.Controllers
{
   // [Authorize(Roles = "Admin")]
    [Route("api/admin")]
    [ApiController]
    public class AdminController : ControllerBase
    {
        private readonly IOrderService _orderService;
        private readonly ICourseService _courseService;
        private readonly ICategoryService _categoryService;
        private readonly IInstructorService _instructorService;

        public AdminController(
            IOrderService orderService,
            ICourseService courseService,
            ICategoryService categoryService,
            IInstructorService instructorService)
        {
            _orderService = orderService;
            _courseService = courseService;
            _categoryService = categoryService;
            _instructorService = instructorService;
        }

        [HttpGet("dashboard")]
        public async Task<IActionResult> GetDashboardStats()
        {
            var today = DateTime.UtcNow;
            var firstDayOfMonth = new DateTime(today.Year, today.Month, 1);

            var stats = new
            {
                TotalCourses = await _courseService.GetCountAsync(),
                TotalCategories = await _categoryService.GetCountAsync(),
                TotalInstructors = await _instructorService.GetCountAsync(),
                MonthlySubscriptions = await _orderService.GetMonthlySubscriptionsAsync(firstDayOfMonth)
            };

            return Ok(stats);
        }
    }
}
