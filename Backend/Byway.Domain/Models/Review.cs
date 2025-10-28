namespace Byway.Domain.Models
{
    public class Review
    {
        public int Id { get; set; }
        public int Rating { get; set; }
        public string? Comment { get; set; }
        public DateTime CreatedAt { get; set; }

        public int CourseId { get; set; }
        public required Course Course { get; set; }

        public string UserId { get; set; } = null!;
        public required ApplicationUser User { get; set; }
    }
}