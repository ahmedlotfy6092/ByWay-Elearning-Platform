namespace Byway.Application.DTOs
{
    public class InstructorDto
    {
        public int Id { get; set; }
        public required string Name { get; set; }
        public required string JobTitle { get; set; }
        public required string ImagePath { get; set; }
        public double Rating { get; set; }
        public DateTime CreatedAt { get; set; }
        public int CoursesCount { get; set; }
    }

    public class CreateInstructorDto
    {
        public required string Name { get; set; }
        public required string JobTitle { get; set; }
        public required string ImagePath { get; set; }
    }

    public class UpdateInstructorDto
    {
        public required string Name { get; set; }
        public required string JobTitle { get; set; }
        public required string ImagePath { get; set; }
    }
}
