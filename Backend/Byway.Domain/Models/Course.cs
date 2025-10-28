using Byway.Domain.Models.Enums;

namespace Byway.Domain.Models
{
    public class Course
    {
        public int Id { get; set; }
        public required string Name { get; set; }
        public required string Description { get; set; }
        public decimal Price { get; set; }
        public decimal? DiscountPrice { get; set; }
        public double Rating { get; set; }
        public int EnrollmentsCount { get; set; }
        public required string ImagePath { get; set; }
        public Level Level { get; set; }
        public bool IsFeatured { get; set; }
        public DateTime CreatedAt { get; set; }
        
        public int CategoryId { get; set; }
        public required Category Category { get; set; }
        
        public int InstructorId { get; set; }
        public required Instructor Instructor { get; set; }
        
        public ICollection<Cart> Carts { get; set; } = new List<Cart>();
        public ICollection<Review> Reviews { get; set; } = new List<Review>();
    }
}
