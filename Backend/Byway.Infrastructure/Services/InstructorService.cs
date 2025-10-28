using AutoMapper;
using Byway.Application.DTOs;
using Byway.Application.Interfaces;
using Byway.Domain.Models;
using Byway.Domain.Models.Enums;
using Microsoft.EntityFrameworkCore;
using Byway.Infrastructure.Data;

namespace Byway.Infrastructure.Services
{
    public class InstructorService : IInstructorService
    {
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;

        public InstructorService(ApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<int> GetCountAsync()
        {
            return await _context.Users.CountAsync();
        }

        public async Task<IEnumerable<InstructorDto>> GetAllAsync(int page = 1, int size = 10, string? search = null)
        {
            var query = _context.Instructors
                .Include(i => i.Courses)
                .AsQueryable();

            if (!string.IsNullOrWhiteSpace(search))
            {
                query = query.Where(i => 
                    i.Name.Contains(search) || 
                    i.JobTitle.ToString().Contains(search)
                );
            }

            var instructors = await query
                .Skip((page - 1) * size)
                .Take(size)
                .ToListAsync();

            // Calculate rating for each instructor
            foreach (var instructor in instructors)
            {
                instructor.Rating = instructor.Courses.Any() 
                    ? instructor.Courses.Average(c => c.Rating) 
                    : 0;
            }

            return _mapper.Map<IEnumerable<InstructorDto>>(instructors);
        }

        public async Task<InstructorDto> GetByIdAsync(int id)
        {
            var instructor = await _context.Instructors
                .Include(i => i.Courses)
                .FirstOrDefaultAsync(i => i.Id == id);

            if (instructor == null)
                throw new KeyNotFoundException($"Instructor with ID {id} not found.");

            instructor.Rating = instructor.Courses.Any() 
                ? instructor.Courses.Average(c => c.Rating) 
                : 0;

            return _mapper.Map<InstructorDto>(instructor);
        }

        public async Task<InstructorDto> CreateAsync(CreateInstructorDto dto)
        {
            var instructor = new Instructor
            {
                Name = dto.Name,
                JobTitle = Enum.Parse<JobTitle>(dto.JobTitle.Replace(" ", "")),
                ImagePath = dto.ImagePath,
                Rating = 0,
                CreatedAt = DateTime.UtcNow
            };

            _context.Instructors.Add(instructor);
            await _context.SaveChangesAsync();

            return await GetByIdAsync(instructor.Id);
        }

        public async Task<InstructorDto> UpdateAsync(int id, UpdateInstructorDto dto)
        {
            var instructor = await _context.Instructors
                .FirstOrDefaultAsync(i => i.Id == id);

            if (instructor == null)
                throw new KeyNotFoundException($"Instructor with ID {id} not found.");

            instructor.Name = dto.Name;
            instructor.JobTitle = Enum.Parse<JobTitle>(dto.JobTitle.Replace(" ", ""));
            instructor.ImagePath = dto.ImagePath;

            await _context.SaveChangesAsync();
            return await GetByIdAsync(instructor.Id);
        }

        public async Task DeleteAsync(int id)
        {
            var instructor = await _context.Instructors
                .Include(i => i.Courses)
                .FirstOrDefaultAsync(i => i.Id == id);

            if (instructor == null)
                throw new KeyNotFoundException($"Instructor with ID {id} not found.");

            // Check if instructor has any courses
            var hasActiveCourses = await _context.Courses
                .AnyAsync(c => c.InstructorId == id);

            if (hasActiveCourses)
                throw new InvalidOperationException("Cannot delete instructor assigned to courses.");

            _context.Instructors.Remove(instructor);
            await _context.SaveChangesAsync();
        }

        public async Task<IEnumerable<InstructorDto>> GetTopInstructorsAsync(int count = 3)
        {
            var instructors = await _context.Instructors
                .OrderByDescending(i => i.Courses.Count)
                .Take(count)
                .ToListAsync();

            return _mapper.Map<IEnumerable<InstructorDto>>(instructors);
        }
    }
}
