namespace Byway.Domain.Models
{
    public class Order
    {
        public int Id { get; set; }
        public required string UserId { get; set; }
        public ApplicationUser User { get; set; }
        
        public required string CourseIds { get; set; } // JSON array of course IDs
        public decimal TotalPrice { get; set; }
        public decimal Tax { get; set; }
        public required string PaymentDetails { get; set; } // JSON payment info
        public DateTime CreatedAt { get; set; }
    }
}
