namespace Byway.Domain.Models
{
    public class Category
    {
        public int Id { get; set; }
        public required string Name { get; set; }
        public required string ImagePath { get; set; }
        public DateTime CreatedAt { get; set; }
        public ICollection<Course> Courses { get; set; } = new List<Course>();
    }
}
