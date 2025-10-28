namespace Byway.Application.DTOs
{
    public class CourseDetailDto
    {
        public int Id { get; set; }
        public required string Title { get; set; }
        public string? Description { get; set; }
        public decimal Price { get; set; }
        public string? ImageUrl { get; set; }
        public double Rating { get; set; }
        public int ReviewsCount { get; set; }
        public int CategoryId { get; set; }
        public string? CategoryName { get; set; }
        public string? InstructorName { get; set; }
        public string? InstructorAvatar { get; set; }
        public List<string> Objectives { get; set; } = new();
        public List<string> Requirements { get; set; } = new();
        public List<ReviewDto> Reviews { get; set; } = new();
        public string? Level { get; set; }
        public int DurationInMinutes { get; set; }
        public List<string> Topics { get; set; } = new();
    }
}