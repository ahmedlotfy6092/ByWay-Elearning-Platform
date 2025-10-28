using Byway.Application.DTOs;

namespace Byway.Application.Interfaces
{
    public interface ICourseService
    {
        Task<IEnumerable<CourseDto>> GetAllAsync(int page = 1, int size = 10, string? search = null, 
            decimal? minPrice = null, decimal? maxPrice = null, double? minRating = null, 
            int? categoryId = null);
        Task<CourseDto> GetByIdAsync(int id);
        Task<CourseDto> CreateAsync(CreateCourseDto dto);
        Task<CourseDto> UpdateAsync(int id, UpdateCourseDto dto);
        Task DeleteAsync(int id);
        Task<IEnumerable<CourseDto>> GetTopCoursesAsync(int count = 5);
        Task<IEnumerable<CourseDto>> GetSimilarCoursesAsync(int courseId, int count = 4);
        Task<int> GetCountAsync();
        Task<IEnumerable<CourseDto>> GetCoursesAsync(CourseSearchDto searchDto);
        Task<CourseDetailDto> GetCourseDetailsAsync(int id);
    }
}
