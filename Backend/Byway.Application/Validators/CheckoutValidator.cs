using FluentValidation;
using Byway.Application.DTOs;

namespace Byway.Application.Validators
{
    public class CheckoutValidator : AbstractValidator<CheckoutDto>
    {
        public CheckoutValidator()
        {
            RuleFor(x => x.CardNumber)
                .NotEmpty()
                .CreditCard()
                .WithMessage("Invalid card number");

            RuleFor(x => x.CardHolderName)
                .NotEmpty()
                .MaximumLength(100)
                .Matches("^[a-zA-Z ]*$")
                .WithMessage("Card holder name can only contain letters and spaces");

            RuleFor(x => x.ExpiryDate)
                .NotEmpty()
                .Matches(@"^(0[1-9]|1[0-2])\/([0-9]{2})$")
                .WithMessage("Expiry date must be in MM/YY format");

            RuleFor(x => x.CVV)
                .NotEmpty()
                .Length(3, 4)
                .Matches("^[0-9]*$")
                .WithMessage("Invalid CVV");
        }
    }
}
