namespace Byway.Application.DTOs
{
    public class CheckoutDto
    {
        public required string CardNumber { get; set; }
        public required string CardHolderName { get; set; }
        public required string ExpiryDate { get; set; }
        public required string CVV { get; set; }
    }
}