using FluentValidation;
using Byway.Application.DTOs;
using Byway.Domain.Models.Enums;

namespace Byway.Application.Validators
{
    public class CreateInstructorDtoValidator : AbstractValidator<CreateInstructorDto>
    {
        public CreateInstructorDtoValidator()
        {
            RuleFor(x => x.Name)
                .NotEmpty().WithMessage("Name is required")
                .MaximumLength(100).WithMessage("Name cannot exceed 100 characters");

            RuleFor(x => x.JobTitle)
                .NotEmpty().WithMessage("Job title is required")
                .Must(BeValidJobTitle).WithMessage("Invalid job title. Must be one of: Fullstack Developer, Backend Developer, Frontend Developer, UX/UI Designer");

            RuleFor(x => x.ImagePath)
                .NotEmpty().WithMessage("Image path is required");
        }

        private bool BeValidJobTitle(string jobTitle)
        {
            return Enum.TryParse<JobTitle>(jobTitle.Replace(" ", ""), out _);
        }
    }

    public class UpdateInstructorDtoValidator : AbstractValidator<UpdateInstructorDto>
    {
        public UpdateInstructorDtoValidator()
        {
            RuleFor(x => x.Name)
                .NotEmpty().WithMessage("Name is required")
                .MaximumLength(100).WithMessage("Name cannot exceed 100 characters");

            RuleFor(x => x.JobTitle)
                .NotEmpty().WithMessage("Job title is required")
                .Must(BeValidJobTitle).WithMessage("Invalid job title. Must be one of: Fullstack Developer, Backend Developer, Frontend Developer, UX/UI Designer");

            RuleFor(x => x.ImagePath)
                .NotEmpty().WithMessage("Image path is required");
        }

        private bool BeValidJobTitle(string jobTitle)
        {
            return Enum.TryParse<JobTitle>(jobTitle.Replace(" ", ""), out _);
        }
    }
}
