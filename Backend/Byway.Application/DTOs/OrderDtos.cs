namespace Byway.Application.DTOs
{
    public class OrderDto
    {
        public int Id { get; set; }
        public required string UserId { get; set; }
        public required string CourseIds { get; set; }
        public List<CourseDto> Courses { get; set; } = new();
        public decimal TotalPrice { get; set; }
        public decimal Tax { get; set; }
        public required string PaymentDetails { get; set; }
        public DateTime CreatedAt { get; set; }
    }

    public class OrderDetailsDto
    {
        public int Id { get; set; }
        public List<CourseDto> Courses { get; set; } = new();
        public decimal SubTotal { get; set; }
        public decimal Tax { get; set; }
        public decimal Total { get; set; }
        public DateTime OrderDate { get; set; }
        public string PaymentStatus { get; set; } = "Completed";
    }
}
