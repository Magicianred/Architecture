using FluentValidation;

namespace Architecture.Model
{
    public abstract class UserModelValidator : AbstractValidator<UserModel>
    {
        public void Auth()
        {
            RuleFor(x => x.Auth).SetValidator(new AuthModelValidator());
        }

        public void Email()
        {
            RuleFor(x => x.Email).EmailAddress();
        }

        public void FirstName()
        {
            RuleFor(x => x.FirstName).NotEmpty();
        }

        public void Id()
        {
            RuleFor(x => x.Id).NotEmpty();
        }

        public void LastName()
        {
            RuleFor(x => x.LastName).NotEmpty();
        }
    }
}
