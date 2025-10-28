using AutoMapper;
using Byway.Application.DTOs;
using Byway.Application.Interfaces;
using Byway.Domain.Models;
using Byway.Domain.Models.Enums;
using Microsoft.EntityFrameworkCore;
using Byway.Infrastructure.Data;

namespace Byway.Infrastructure.Services
{
    public class CourseService : ICourseService
    {
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;

        public CourseService(ApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<int> GetCountAsync()
        {
            return await _context.Courses.CountAsync();
        }

        public async Task<IEnumerable<CourseDto>> GetCoursesAsync(CourseSearchDto searchDto)
        {
            var query = _context.Courses.AsQueryable();

            if (!string.IsNullOrEmpty(searchDto.SearchTerm))
            {
                query = query.Where(c => c.Name.Contains(searchDto.SearchTerm) || 
                                       c.Description.Contains(searchDto.SearchTerm));
            }

            if (searchDto.CategoryId.HasValue)
            {
                query = query.Where(c => c.CategoryId == searchDto.CategoryId);
            }

            if (searchDto.MinPrice.HasValue)
            {
                query = query.Where(c => c.Price >= searchDto.MinPrice);
            }

            if (searchDto.MaxPrice.HasValue)
            {
                query = query.Where(c => c.Price <= searchDto.MaxPrice);
            }

            if (searchDto.Rating.HasValue)
            {
                query = query.Where(c => c.Rating >= searchDto.Rating);
            }

            // Apply sorting
            query = searchDto.SortBy?.ToLower() switch
            {
                "price" => searchDto.SortDescending ? query.OrderByDescending(c => c.Price) : query.OrderBy(c => c.Price),
                "rating" => searchDto.SortDescending ? query.OrderByDescending(c => c.Rating) : query.OrderBy(c => c.Rating),
                "name" => searchDto.SortDescending ? query.OrderByDescending(c => c.Name) : query.OrderBy(c => c.Name),
                _ => query.OrderByDescending(c => c.Rating)
            };

            // Apply pagination
            var skip = (searchDto.PageNumber - 1) * searchDto.PageSize;
            query = query.Skip(skip).Take(searchDto.PageSize);

            var courses = await query
                .Include(c => c.Category)
                .Include(c => c.Instructor)
                .ToListAsync();

            return _mapper.Map<IEnumerable<CourseDto>>(courses);
        }

        public async Task<CourseDetailDto> GetCourseDetailsAsync(int id)
        {
            var course = await _context.Courses
                .Include(c => c.Category)
                .Include(c => c.Instructor)
                .Include(c => c.Reviews)
                    .ThenInclude(r => r.User)
                .FirstOrDefaultAsync(c => c.Id == id);

            if (course == null)
                throw new KeyNotFoundException($"Course with ID {id} not found");

            return _mapper.Map<CourseDetailDto>(course);
        }

        public async Task<IEnumerable<CourseDto>> GetAllAsync(int page = 1, int size = 10, string? search = null, 
            decimal? minPrice = null, decimal? maxPrice = null, double? minRating = null, 
            int? categoryId = null)
        {
            var query = _context.Courses
                .Include(c => c.Category)
                .Include(c => c.Instructor)
                .AsQueryable();

            if (!string.IsNullOrWhiteSpace(search))
            {
                query = query.Where(c => 
                    c.Name.Contains(search) || 
                    c.Description.Contains(search) ||
                    c.Category.Name.Contains(search)
                );
            }

            if (minPrice.HasValue)
                query = query.Where(c => c.Price >= minPrice.Value);

            if (maxPrice.HasValue)
                query = query.Where(c => c.Price <= maxPrice.Value);

            if (minRating.HasValue)
                query = query.Where(c => c.Rating >= minRating.Value);

            if (categoryId.HasValue)
                query = query.Where(c => c.CategoryId == categoryId.Value);

            var courses = await query
                .Skip((page - 1) * size)
                .Take(size)
                .ToListAsync();

            return _mapper.Map<IEnumerable<CourseDto>>(courses);
        }

        public async Task<CourseDto> GetByIdAsync(int id)
        {
            var course = await _context.Courses
                .Include(c => c.Category)
                .Include(c => c.Instructor)
                .FirstOrDefaultAsync(c => c.Id == id);

            if (course == null)
                throw new KeyNotFoundException($"Course with ID {id} not found.");

            return _mapper.Map<CourseDto>(course);
        }

        public async Task<CourseDto> CreateAsync(CreateCourseDto dto)
        {
            var category = await _context.Categories.FindAsync(dto.CategoryId);
            if (category == null)
                throw new KeyNotFoundException($"Category with ID {dto.CategoryId} not found.");

            var instructor = await _context.Instructors.FindAsync(dto.InstructorId);
            if (instructor == null)
                throw new KeyNotFoundException($"Instructor with ID {dto.InstructorId} not found.");

            var course = new Course
            {
                Name = dto.Name,
                Description = dto.Description,
                Price = dto.Price,
                DiscountPrice = dto.DiscountPrice,
                Rating = 0,
                EnrollmentsCount = 0,
                Level = Enum.Parse<Level>(dto.Level.Replace(" ", "")),
                ImagePath = dto.ImagePath,
                CategoryId = dto.CategoryId,
                Category = category,
                InstructorId = dto.InstructorId,
                Instructor = instructor,
                IsFeatured = dto.IsFeatured,
                CreatedAt = DateTime.UtcNow
            };

            _context.Courses.Add(course);
            await _context.SaveChangesAsync();

            return await GetByIdAsync(course.Id);
        }

        public async Task<CourseDto> UpdateAsync(int id, UpdateCourseDto dto)
        {
            var course = await _context.Courses
                .Include(c => c.Category)
                .Include(c => c.Instructor)
                .FirstOrDefaultAsync(c => c.Id == id);

            if (course == null)
                throw new KeyNotFoundException($"Course with ID {id} not found.");

            // Check if course has been purchased
            var hasBeenPurchased = await _context.Orders
                .AnyAsync(o => o.CourseIds.Contains(id.ToString()));

            if (hasBeenPurchased)
                throw new InvalidOperationException("Cannot update course that has been purchased.");

            var category = await _context.Categories.FindAsync(dto.CategoryId);
            if (category == null)
                throw new KeyNotFoundException($"Category with ID {dto.CategoryId} not found.");

            course.Name = dto.Name;
            course.Description = dto.Description;
            course.Price = dto.Price;
            course.DiscountPrice = dto.DiscountPrice;
            course.Level = Enum.Parse<Level>(dto.Level.Replace(" ", ""));
            course.ImagePath = dto.ImagePath;
            course.CategoryId = dto.CategoryId;
            course.Category = category;
            course.IsFeatured = dto.IsFeatured;

            await _context.SaveChangesAsync();

            return await GetByIdAsync(course.Id);
        }

        public async Task DeleteAsync(int id)
        {
            var course = await _context.Courses
                .FirstOrDefaultAsync(c => c.Id == id);

            if (course == null)
                throw new KeyNotFoundException($"Course with ID {id} not found.");

            // Check if course has been purchased
            var hasBeenPurchased = await _context.Orders
                .AnyAsync(o => o.CourseIds.Contains(id.ToString()));

            if (hasBeenPurchased)
                throw new InvalidOperationException("Cannot delete course that has been purchased.");

            _context.Courses.Remove(course);
            await _context.SaveChangesAsync();
        }

        public async Task<IEnumerable<CourseDto>> GetTopCoursesAsync(int count = 5)
        {
            var courses = await _context.Courses
                .Include(c => c.Category)
                .Include(c => c.Instructor)
                .OrderByDescending(c => c.Rating)
                .Take(count)
                .ToListAsync();

            return _mapper.Map<IEnumerable<CourseDto>>(courses);
        }

        public async Task<IEnumerable<CourseDto>> GetSimilarCoursesAsync(int courseId, int count = 4)
        {
            var course = await _context.Courses
                .FirstOrDefaultAsync(c => c.Id == courseId);

            if (course == null)
                throw new KeyNotFoundException($"Course with ID {courseId} not found.");

            var similarCourses = await _context.Courses
                .Include(c => c.Category)
                .Include(c => c.Instructor)
                .Where(c => c.CategoryId == course.CategoryId && c.Id != courseId)
                .OrderByDescending(c => c.Rating)
                .Take(count)
                .ToListAsync();

            return _mapper.Map<IEnumerable<CourseDto>>(similarCourses);
        }
    }
}
