namespace Byway.Application.DTOs
{
    public class CourseDto
    {
        public int Id { get; set; }
        public required string Name { get; set; }
        public required string Description { get; set; }
        public decimal Price { get; set; }
        public decimal? DiscountPrice { get; set; }
        public double Rating { get; set; }
        public int EnrollmentsCount { get; set; }
        public required string ImagePath { get; set; }
        public required string Level { get; set; }
        public bool IsFeatured { get; set; }
        public DateTime CreatedAt { get; set; }
        public int CategoryId { get; set; }
        public required string CategoryName { get; set; }
        public int InstructorId { get; set; }
        public required string InstructorName { get; set; }
    }

    public class CreateCourseDto
    {
        public required string Name { get; set; }
        public required string Description { get; set; }
        public decimal Price { get; set; }
        public decimal? DiscountPrice { get; set; }
        public required string Level { get; set; }
        public required string ImagePath { get; set; }
        public required int CategoryId { get; set; }
        public required int InstructorId { get; set; }
        public bool IsFeatured { get; set; }
    }

    public class UpdateCourseDto
    {
        public required string Name { get; set; }
        public required string Description { get; set; }
        public decimal Price { get; set; }
        public decimal? DiscountPrice { get; set; }
        public required string Level { get; set; }
        public required string ImagePath { get; set; }
        public required int CategoryId { get; set; }
        public bool IsFeatured { get; set; }
    }
}
