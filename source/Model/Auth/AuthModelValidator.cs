using FluentValidation;

namespace Architecture.Model
{
    public sealed class AuthModelValidator : AbstractValidator<AuthModel>
    {
        public AuthModelValidator()
        {
            RuleFor(x => x.Login).NotEmpty();
            RuleFor(x => x.Password).NotEmpty();
            RuleFor(x => x.Roles).NotEmpty();
        }
    }
}
