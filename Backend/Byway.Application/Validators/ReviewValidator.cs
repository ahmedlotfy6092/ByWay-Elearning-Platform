using Byway.Application.DTOs;
using FluentValidation;

namespace Byway.Application.Validators
{
    public class ReviewValidator : AbstractValidator<ReviewDto>
    {
        public ReviewValidator()
        {
            RuleFor(x => x.CourseId)
                .NotEmpty()
                .GreaterThan(0)
                .WithMessage("Invalid course ID");

            RuleFor(x => x.Rating)
                .NotEmpty()
                .InclusiveBetween(1, 5)
                .WithMessage("Rating must be between 1 and 5");

            RuleFor(x => x.Comment)
                .MaximumLength(500)
                .When(x => !string.IsNullOrEmpty(x.Comment))
                .WithMessage("Comment cannot exceed 500 characters");
        }
    }
}


