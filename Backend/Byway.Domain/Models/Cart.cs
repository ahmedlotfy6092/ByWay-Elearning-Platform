namespace Byway.Domain.Models
{
    public class Cart
    {
        public int Id { get; set; }
        public required string UserId { get; set; }
        public   ApplicationUser? User { get; set; }
        
        public int CourseId { get; set; }
        public   Course Course { get; set; }
        
        public DateTime CreatedAt { get; set; }
    }
}
