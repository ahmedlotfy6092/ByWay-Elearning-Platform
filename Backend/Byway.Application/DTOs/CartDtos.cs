namespace Byway.Application.DTOs
{
    public class CartItemDto
    {
        public int Id { get; set; }
        public int CourseId { get; set; }
        public required string CourseName { get; set; }
        public required string CourseImage { get; set; }
        public decimal Price { get; set; }
        public decimal? DiscountPrice { get; set; }

        public int Quantity { get; set; }

    }

    public class CartDto
    {
        public List<CartItemDto> Items { get; set; } = new();
        public decimal SubTotal { get; set; }
        public decimal Tax { get; set; }
        public decimal Total { get; set; }
    }
}
