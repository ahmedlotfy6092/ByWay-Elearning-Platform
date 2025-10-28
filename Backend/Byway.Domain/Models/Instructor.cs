using Byway.Domain.Models.Enums;

namespace Byway.Domain.Models
{
    public class Instructor
    {
        public int Id { get; set; }
        public required string Name { get; set; }
        public JobTitle JobTitle { get; set; }
        public required string ImagePath { get; set; }
        public double Rating { get; set; }
        public DateTime CreatedAt { get; set; }
        public ICollection<Course> Courses { get; set; } = new List<Course>();
    }
}
