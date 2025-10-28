using Byway.Application.DTOs;

namespace Byway.Application.Interfaces
{
    public interface IInstructorService
    {
        Task<IEnumerable<InstructorDto>> GetAllAsync(int page = 1, int size = 10, string? search = null);
        Task<InstructorDto> GetByIdAsync(int id);
        Task<InstructorDto> CreateAsync(CreateInstructorDto dto);
        Task<InstructorDto> UpdateAsync(int id, UpdateInstructorDto dto);
        Task DeleteAsync(int id);
        Task<IEnumerable<InstructorDto>> GetTopInstructorsAsync(int count = 3);
        Task<int> GetCountAsync();
    }
}
