using Byway.Application.DTOs;
using Byway.Application.Interfaces;
using AutoMapper;
using Byway.Domain.Models;
using Microsoft.EntityFrameworkCore;
using Byway.Infrastructure.Data;

namespace Byway.Infrastructure.Services
{
    public class CategoryService : ICategoryService
    {
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;

        public CategoryService(ApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<IEnumerable<CategoryDto>> GetAllCategoriesAsync()
        {
            var categories = await _context.Categories
                .Include(c => c.Courses)
                .ToListAsync();
            return _mapper.Map<IEnumerable<CategoryDto>>(categories);
        }

        public async Task<CategoryDto> GetCategoryByIdAsync(int id)
        {
            var category = await _context.Categories
                .Include(c => c.Courses)
                .FirstOrDefaultAsync(c => c.Id == id);
            
            if (category == null)
                throw new KeyNotFoundException($"Category with ID {id} not found");

            return _mapper.Map<CategoryDto>(category);
        }

        public async Task<CategoryDto> CreateCategoryAsync(CategoryDto categoryDto)
        {
            var category = _mapper.Map<Category>(categoryDto);
            _context.Categories.Add(category);
            await _context.SaveChangesAsync();
            return _mapper.Map<CategoryDto>(category);
        }

        public async Task<CategoryDto> UpdateCategoryAsync(int id, CategoryDto categoryDto)
        {
            var category = await _context.Categories.FindAsync(id);
            
            if (category == null)
                throw new KeyNotFoundException($"Category with ID {id} not found");

            _mapper.Map(categoryDto, category);
            await _context.SaveChangesAsync();
            return _mapper.Map<CategoryDto>(category);
        }

        public async Task DeleteCategoryAsync(int id)
        {
            var category = await _context.Categories.FindAsync(id);
            
            if (category == null)
                throw new KeyNotFoundException($"Category with ID {id} not found");

            _context.Categories.Remove(category);
            await _context.SaveChangesAsync();
        }

        public async Task<int> GetCountAsync()
        {
            return await _context.Categories.CountAsync();
        }

        public async Task<IEnumerable<CategoryDto>> GetTopCategoriesAsync(int count)
        {
            var categories = await _context.Categories
                .Include(c => c.Courses)
                .OrderByDescending(c => c.Courses.Count)
                .Take(count)
                .ToListAsync();

            return _mapper.Map<IEnumerable<CategoryDto>>(categories);
        }
    }
}