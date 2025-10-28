using FluentValidation;
using Byway.Application.DTOs;

namespace Byway.Application.Validators
{
    public class CartValidator : AbstractValidator<CartItemDto>
    {
        public CartValidator()
        {
            RuleFor(x => x.CourseId)
                .NotEmpty()
                .GreaterThan(0)
                .WithMessage("Invalid course ID");

            RuleFor(x => x.Quantity)
                .NotEmpty()
                .GreaterThan(0)
                .LessThanOrEqualTo(10)
                .WithMessage("Quantity must be between 1 and 10");
        }
    }
}
