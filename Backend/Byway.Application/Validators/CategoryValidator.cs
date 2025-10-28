using Byway.Application.DTOs;
using FluentValidation;

namespace Byway.Application.Validators
{
    public class CategoryValidator : AbstractValidator<CategoryDto>
    {
        public CategoryValidator()
        {
            RuleFor(x => x.Name)
                .NotEmpty()
                .MaximumLength(100)
                .WithMessage("Category name is required and cannot exceed 100 characters");

            RuleFor(x => x.Description)
                .MaximumLength(500)
                .When(x => !string.IsNullOrEmpty(x.Description))
                .WithMessage("Description cannot exceed 500 characters");

            RuleFor(x => x.ImageUrl)
                .MaximumLength(255)
                .When(x => !string.IsNullOrEmpty(x.ImageUrl))
                .WithMessage("Image URL cannot exceed 255 characters");
        }
    }
}


