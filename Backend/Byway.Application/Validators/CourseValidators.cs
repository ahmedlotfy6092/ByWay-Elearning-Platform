using FluentValidation;
using Byway.Application.DTOs;
using Byway.Domain.Models.Enums;

namespace Byway.Application.Validators
{
    public class CreateCourseDtoValidator : AbstractValidator<CreateCourseDto>
    {
        public CreateCourseDtoValidator()
        {
            RuleFor(x => x.Name)
                .NotEmpty().WithMessage("Name is required")
                .MaximumLength(200).WithMessage("Name cannot exceed 200 characters");

            RuleFor(x => x.Description)
                .NotEmpty().WithMessage("Description is required")
                .MaximumLength(2000).WithMessage("Description cannot exceed 2000 characters");

            RuleFor(x => x.Price)
                .GreaterThan(0).WithMessage("Price must be greater than 0");

            RuleFor(x => x.Level)
                .NotEmpty().WithMessage("Level is required")
                .Must(BeValidLevel).WithMessage("Invalid level. Must be one of: All Levels, Beginner, Intermediate, Expert");

            RuleFor(x => x.ImagePath)
                .NotEmpty().WithMessage("Image path is required");

            RuleFor(x => x.CategoryId)
                .GreaterThan(0).WithMessage("Category ID must be greater than 0");

            RuleFor(x => x.InstructorId)
                .GreaterThan(0).WithMessage("Instructor ID must be greater than 0");
        }

        private bool BeValidLevel(string level)
        {
            return Enum.TryParse<Level>(level.Replace(" ", ""), out _);
        }
    }

    public class UpdateCourseDtoValidator : AbstractValidator<UpdateCourseDto>
    {
        public UpdateCourseDtoValidator()
        {
            RuleFor(x => x.Name)
                .NotEmpty().WithMessage("Name is required")
                .MaximumLength(200).WithMessage("Name cannot exceed 200 characters");

            RuleFor(x => x.Description)
                .NotEmpty().WithMessage("Description is required")
                .MaximumLength(2000).WithMessage("Description cannot exceed 2000 characters");

            RuleFor(x => x.Price)
                .GreaterThan(0).WithMessage("Price must be greater than 0");

            RuleFor(x => x.Level)
                .NotEmpty().WithMessage("Level is required")
                .Must(BeValidLevel).WithMessage("Invalid level. Must be one of: All Levels, Beginner, Intermediate, Expert");

            RuleFor(x => x.ImagePath)
                .NotEmpty().WithMessage("Image path is required");

            RuleFor(x => x.CategoryId)
                .GreaterThan(0).WithMessage("Category ID must be greater than 0");
        }

        private bool BeValidLevel(string level)
        {
            return Enum.TryParse<Level>(level.Replace(" ", ""), out _);
        }
    }
}
