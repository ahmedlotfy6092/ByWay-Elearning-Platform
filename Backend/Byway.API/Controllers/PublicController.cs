using Microsoft.AspNetCore.Mvc;
using Byway.Application.Interfaces;
using Byway.Application.DTOs;

namespace Byway.API.Controllers
{
    [Route("api/public")]
    [ApiController]
    public class PublicController : ControllerBase
    {
        private readonly ICourseService _courseService;
        private readonly ICategoryService _categoryService;
        private readonly IInstructorService _instructorService;

        public PublicController(
            ICourseService courseService,
            ICategoryService categoryService,
            IInstructorService instructorService)
        {
            _courseService = courseService;
            _categoryService = categoryService;
            _instructorService = instructorService;
        }

        [HttpGet("top-categories")]
        public async Task<IActionResult> GetTopCategories()
        {
            var categories = await _categoryService.GetTopCategoriesAsync(3);
            return Ok(categories);
        }

        [HttpGet("top-courses")]
        public async Task<IActionResult> GetTopCourses()
        {
            var courses = await _courseService.GetTopCoursesAsync(5);
            return Ok(courses);
        }

        [HttpGet("top-instructors")]
        public async Task<IActionResult> GetTopInstructors()
        {
            var instructors = await _instructorService.GetTopInstructorsAsync(3);
            return Ok(instructors);
        }

        [HttpGet("courses")]
        public async Task<IActionResult> GetCourses([FromQuery] CourseSearchDto searchDto)
        {
            var courses = await _courseService.GetCoursesAsync(searchDto);
            return Ok(courses);
        }

        [HttpGet("courses/{id}")]
        public async Task<IActionResult> GetCourseDetails(int id)
        {
            var course = await _courseService.GetCourseDetailsAsync(id);
            if (course == null)
                return NotFound();

            return Ok(course);
        }

        [HttpGet("courses/{id}/similar")]
        public async Task<IActionResult> GetSimilarCourses(int id)
        {
            var courses = await _courseService.GetSimilarCoursesAsync(id, 4);
            return Ok(courses);
        }
    }
}
