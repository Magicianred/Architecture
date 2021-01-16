# Architecture

![](https://dev.azure.com/rafaelfgx/Architecture/_apis/build/status/Build)
![](https://img.shields.io/github/repo-size/rafaelfgx/Architecture?label=Size)

This project is an example of architecture using new technologies and best practices.

The goal is to share knowledge and use it as reference for new projects.

Thanks for enjoying!

## Technologies

* [.NET 5](https://dotnet.microsoft.com/download)
* [ASP.NET Core 5](https://docs.microsoft.com/en-us/aspnet/core)
* [Entity Framework Core 5](https://docs.microsoft.com/en-us/ef/core)
* [C# 9](https://docs.microsoft.com/en-us/dotnet/csharp)
* [Angular 11](https://angular.io/docs)
* [UIkit](https://getuikit.com/docs/introduction)

## Practices

* Clean Code
* SOLID Principles
* DDD (Domain-Driven Design)
* Separation of Concerns

## Run

<details>
<summary>Command Line</summary>

#### Prerequisites

* [.NET 5 SDK](https://dotnet.microsoft.com/download/dotnet/5.0)
* [SQL Server](https://go.microsoft.com/fwlink/?linkid=866662)
* [Node.js](https://nodejs.org)
* [Angular CLI](https://cli.angular.io)

#### Steps

1. Open directory **source\Web\Frontend** in command line and execute **npm run restore**.
2. Open directory **source\Web** in command line and execute **dotnet run**.
3. Open <https://localhost:8090>.

</details>

<details>
<summary>Visual Studio Code</summary>

#### Prerequisites

* [.NET 5 SDK](https://dotnet.microsoft.com/download/dotnet/5.0)
* [SQL Server](https://go.microsoft.com/fwlink/?linkid=866662)
* [Visual Studio Code](https://code.visualstudio.com)
* [C# Extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode.csharp)
* [Node.js](https://nodejs.org)
* [Angular CLI](https://cli.angular.io)

#### Steps

1. Open directory **source\Web\Frontend** in command line and execute **npm run restore**.
2. Open **source** directory in Visual Studio Code.
3. Press **F5**.

</details>

<details>
<summary>Visual Studio</summary>

#### Prerequisites

* [.NET 5 SDK](https://dotnet.microsoft.com/download/dotnet/5.0)
* [Visual Studio](https://visualstudio.microsoft.com)
* [Node.js](https://nodejs.org)
* [Angular CLI](https://cli.angular.io)

#### Steps

1. Open directory **source\Web\Frontend** in command line and execute **npm run restore**.
2. Open **source\Architecture.sln** in Visual Studio.
3. Set **Architecture.Web** as startup project.
4. Press **F5**.

</details>

<details>
<summary>Docker</summary>

#### Prerequisites

* [Docker](https://www.docker.com/get-started)

#### Steps

1. Execute **docker-compose up --build -d** in root directory.
2. Open <http://localhost:8090>.

</details>

## Utils

<details>
<summary>Books</summary>

* **Clean Code: A Handbook of Agile Software Craftsmanship** - Robert C. Martin (Uncle Bob)
* **Clean Architecture: A Craftsman's Guide to Software Structure and Design** - Robert C. Martin (Uncle Bob)
* **Implementing Domain-Driven Design** - Vaughn Vernon
* **Domain-Driven Design Distilled** - Vaughn Vernon
* **Domain-Driven Design: Tackling Complexity in the Heart of Software** - Eric Evans
* **Domain-Driven Design Reference: Definitions and Pattern Summaries** - Eric Evans

</details>

<details>
<summary>Tools</summary>

* [Visual Studio](https://visualstudio.microsoft.com)
* [Visual Studio Code](https://code.visualstudio.com)
* [SQL Server](https://www.microsoft.com/sql-server)
* [Node.js](https://nodejs.org)
* [Angular CLI](https://cli.angular.io)
* [StackBlitz](https://stackblitz.com)
* [Postman](https://www.getpostman.com)

</details>

<details>
<summary>Visual Studio Extensions</summary>

* [CodeMaid](https://marketplace.visualstudio.com/items?itemName=SteveCadwallader.CodeMaid)
* [ReSharper](https://www.jetbrains.com/resharper)

</details>

<details>
<summary>Visual Studio Code Extensions</summary>

* [Angular Language Service](https://marketplace.visualstudio.com/items?itemName=Angular.ng-template)
* [Angular Snippets](https://marketplace.visualstudio.com/items?itemName=johnpapa.Angular2)
* [Atom One Dark Theme](https://marketplace.visualstudio.com/items?itemName=akamud.vscode-theme-onedark)
* [Bracket Pair Colorizer](https://marketplace.visualstudio.com/items?itemName=CoenraadS.bracket-pair-colorizer-2)
* [C#](https://marketplace.visualstudio.com/items?itemName=ms-dotnettools.csharp)
* [Docker](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-docker)
* [Kubernetes](https://marketplace.visualstudio.com/items?itemName=ms-kubernetes-tools.vscode-kubernetes-tools)
* [Material Icon Theme](https://marketplace.visualstudio.com/items?itemName=PKief.material-icon-theme)
* [Remote Development](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.vscode-remote-extensionpack)
* [Sort Lines](https://marketplace.visualstudio.com/items?itemName=Tyriar.sort-lines)
* [Visual Studio Keymap](https://marketplace.visualstudio.com/items?itemName=ms-vscode.vs-keybindings)

</details>

## Nuget Packages

**Source:** [https://github.com/rafaelfgx/DotNetCore](https://github.com/rafaelfgx/DotNetCore)

**Published:** [https://www.nuget.org/profiles/rafaelfgx](https://www.nuget.org/profiles/rafaelfgx)

## Layers

**Web:** Frontend and API.

**Application:** Flow control.

**Domain:** Business rules and domain logic.

**Model:** Data transfer objects.

**Database:** Data persistence.

## Web

### Frontend

### Service

```typescript
export class AppCustomerService {
    constructor(
        private readonly http: HttpClient,
        private readonly gridService: GridService) { }

    add(model: CustomerModel) {
        return this.http.post<number>("customers", model);
    }

    delete(id: number) {
        return this.http.delete(`customers/${id}`);
    }

    get(id: number) {
        return this.http.get<CustomerModel>(`customers/${id}`);
    }

    grid(parameters: GridParametersModel) {
        return this.gridService.get<CustomerModel>("customers/grid", parameters);
    }

    inactivate(id: number) {
        return this.http.patch(`customers/${id}/inactivate`, {});
    }

    list() {
        return this.http.get<CustomerModel[]>("customers");
    }

    update(model: CustomerModel) {
        return this.http.put(`customers/${model.id}`, model);
    }
}
```

### Guard

```typescript
export class AppGuard implements CanActivate {
    constructor(private readonly appAuthService: AppAuthService) { }

    canActivate() {
        if (this.appAuthService.authenticated()) { return true; }
        this.appAuthService.signin();
        return false;
    }
}
```

### ErrorHandler

```typescript
export class AppErrorHandler implements ErrorHandler {
    constructor(private readonly appModalService: AppModalService) { }

    handleError(error: any) {
        if (error instanceof HttpErrorResponse) {
            switch (error.status) {
                case 422: {
                    this.appModalService.alert(error.error);
                    return;
                }
            }
        }

        console.error(error);
    }
}
```

### HttpInterceptor

```typescript
export class AppHttpInterceptor implements HttpInterceptor {
    constructor(private readonly appAuthService: AppAuthService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler) {
        request = request.clone({
            setHeaders: { Authorization: `Bearer ${this.appAuthService.token()}` }
        });

        return next.handle(request);
    }
}
```
### API

### Startup

```csharp
public sealed class Startup
{
    public void Configure(IApplicationBuilder application)
    {
        application.UseException();
        application.UseHttps();
        application.UseRouting();
        application.UseResponseCompression();
        application.UseAuthentication();
        application.UseAuthorization();
        application.UseEndpoints();
        application.UseSpa();
    }

    public void ConfigureServices(IServiceCollection services)
    {
        services.AddSecurity();
        services.AddResponseCompression();
        services.AddControllersMvcJsonOptions();
        services.AddSpa();
        services.AddContext();
        services.AddServices();
    }
}
```

### Controller

```csharp
[ApiController]
[Route("customers")]
public sealed class CustomerController : ControllerBase
{
    private readonly ICustomerService _customerService;

    public CustomerController(ICustomerService customerService)
    {
        _customerService = customerService;
    }

    [HttpPost]
    public Task<IActionResult> AddAsync(CustomerModel model)
    {
        return _customerService.AddAsync(model).ResultAsync();
    }

    [HttpDelete("{id}")]
    public Task<IActionResult> DeleteAsync(long id)
    {
        return _customerService.DeleteAsync(id).ResultAsync();
    }

    [HttpGet("{id}")]
    public Task<IActionResult> GetAsync(long id)
    {
        return _customerService.GetAsync(id).ResultAsync();
    }

    [HttpGet("grid")]
    public Task<IActionResult> GridAsync([FromQuery] GridParameters parameters)
    {
        return _customerService.GridAsync(parameters).ResultAsync();
    }

    [HttpPatch("{id}/inactivate")]
    public Task InactivateAsync(long id)
    {
        return _customerService.InactivateAsync(id);
    }

    [HttpGet]
    public Task<IActionResult> ListAsync()
    {
        return _customerService.ListAsync().ResultAsync();
    }

    [HttpPut("{id}")]
    public Task<IActionResult> UpdateAsync(CustomerModel model)
    {
        return _customerService.UpdateAsync(model).ResultAsync();
    }
}
```

## Application

### Service

```csharp
public sealed class CustomerService : ICustomerService
{
    private readonly ICustomerFactory _customerFactory;
    private readonly ICustomerRepository _customerRepository;
    private readonly IUnitOfWork _unitOfWork;

    public CustomerService
    (
        ICustomerFactory customerFactory,
        ICustomerRepository customerRepository,
        IUnitOfWork unitOfWork
    )
    {
        _customerFactory = customerFactory;
        _customerRepository = customerRepository;
        _unitOfWork = unitOfWork;
    }

    public async Task<IResult<long>> AddAsync(CustomerModel model)
    {
        var validation = await new AddCustomerModelValidator().ValidationAsync(model);

        if (validation.Failed)
        {
            return Result<long>.Fail(validation.Message);
        }

        var customer = _customerFactory.Create(model);

        await _customerRepository.AddAsync(customer);

        await _unitOfWork.SaveChangesAsync();

        return Result<long>.Success(customer.Id);
    }

    public async Task<IResult> DeleteAsync(long id)
    {
        await _customerRepository.DeleteAsync(id);

        await _unitOfWork.SaveChangesAsync();

        return Result.Success();
    }

    public Task<CustomerModel> GetAsync(long id)
    {
        return _customerRepository.GetModelAsync(id);
    }

    public Task<Grid<CustomerModel>> GridAsync(GridParameters parameters)
    {
        return _customerRepository.GridAsync(parameters);
    }

    public async Task InactivateAsync(long id)
    {
        var customer = new Customer(id);

        customer.Inactivate();

        await _customerRepository.InactivateAsync(customer);

        await _unitOfWork.SaveChangesAsync();
    }

    public Task<IEnumerable<CustomerModel>> ListAsync()
    {
        return _customerRepository.ListModelAsync();
    }

    public async Task<IResult> UpdateAsync(CustomerModel model)
    {
        var validation = await new UpdateCustomerModelValidator().ValidationAsync(model);

        if (validation.Failed)
        {
            return Result.Fail(validation.Message);
        }

        var customer = _customerFactory.Create(model);

        await _customerRepository.UpdateAsync(customer.Id, customer);

        await _unitOfWork.SaveChangesAsync();

        return Result.Success();
    }
}
```

### Factory

```csharp
public sealed class CustomerFactory : ICustomerFactory
{
    public Customer Create(CustomerModel model)
    {
        return new Customer
        (
            model.Id,
            new Name(model.FirstName, model.LastName),
            new Email(model.Email)
        );
    }
}
```

## Domain

### Entity

```csharp
public sealed class Customer : Entity<long>
{
    public Customer(long id) : base(id) { }

    public Customer
    (
        long id,
        Name name,
        Email email
    )
    : base(id)
    {
        Name = name;
        Email = email;
        Activate();
    }

    public Name Name { get; private set; }

    public Email Email { get; private set; }

    public Status Status { get; private set; }

    public void Activate()
    {
        Status = Status.Active;
    }

    public void Inactivate()
    {
        Status = Status.Inactive;
    }
}
```

### ValueObject

```csharp
public sealed record Name(string FirstName, string LastName);
```

## Model

### Model

```csharp
public sealed record CustomerModel
{
    public long Id { get; init; }

    public string FirstName { get; init; }

    public string LastName { get; init; }

    public string Email { get; init; }
}
```

### ModelValidator

```csharp
public abstract class CustomerModelValidator : AbstractValidator<CustomerModel>
{
    public CustomerModelValidator Id()
    {
        RuleFor(customer => customer.Id).NotEmpty();
        return this;
    }

    public CustomerModelValidator FirstName()
    {
        RuleFor(customer => customer.FirstName).NotEmpty();
        return this;
    }

    public CustomerModelValidator LastName()
    {
        RuleFor(customer => customer.LastName).NotEmpty();
        return this;
    }

    public CustomerModelValidator Email()
    {
        RuleFor(customer => customer.Email).EmailAddress();
        return this;
    }
}
```

```csharp
public sealed class AddCustomerModelValidator : CustomerModelValidator
{
    public AddCustomerModelValidator() => FirstName().LastName().Email();
}
```

```csharp
public sealed class UpdateCustomerModelValidator : CustomerModelValidator
{
    public UpdateCustomerModelValidator() => Id().FirstName().LastName().Email();
}
```

```csharp
public sealed class DeleteCustomerModelValidator : CustomerModelValidator
{
    public DeleteCustomerModelValidator() => Id();
}
```

## Database

### Context

```csharp
public sealed class Context : DbContext
{
    public Context(DbContextOptions options) : base(options) { }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        builder.ApplyConfigurationsFromAssembly(typeof(Context).Assembly).Seed();
    }
}
```

### Configuration

```csharp
public sealed class CustomerConfiguration : IEntityTypeConfiguration<Customer>
{
    public void Configure(EntityTypeBuilder<Customer> builder)
    {
        builder.ToTable(nameof(Customer), nameof(Customer));

        builder.HasKey(customer => customer.Id);

        builder.Property(customer => customer.Id).ValueGeneratedOnAdd().IsRequired();

        builder.Property(customer => customer.Status).IsRequired();

        builder.OwnsOne(customer => customer.Name, customerName =>
        {
            customerName.Property(name => name.FirstName).HasColumnName(nameof(Name.FirstName)).HasMaxLength(100).IsRequired();

            customerName.Property(name => name.LastName).HasColumnName(nameof(Name.LastName)).HasMaxLength(200).IsRequired();
        });

        builder.OwnsOne(customer => customer.Email, customerEmail =>
        {
            customerEmail.Property(email => email.Value).HasColumnName(nameof(User.Email)).HasMaxLength(300).IsRequired();

            customerEmail.HasIndex(email => email.Value).IsUnique();
        });
    }
}
```

### Repository

```csharp
public sealed class CustomerRepository : EFRepository<Customer>, ICustomerRepository
{
    public CustomerRepository(Context context) : base(context) { }

    public Task<CustomerModel> GetModelAsync(long id)
    {
        return Queryable.Where(CustomerExpression.Id(id)).Select(CustomerExpression.Model).SingleOrDefaultAsync();
    }

    public Task<Grid<CustomerModel>> GridAsync(GridParameters parameters)
    {
        return Queryable.Select(CustomerExpression.Model).GridAsync(parameters);
    }

    public Task InactivateAsync(Customer customer)
    {
        return UpdatePartialAsync(customer.Id, new { customer.Status });
    }

    public async Task<IEnumerable<CustomerModel>> ListModelAsync()
    {
        return await Queryable.Select(CustomerExpression.Model).ToListAsync();
    }
}
```

### Expression

```cs
public static class CustomerExpression
{
    public static Expression<Func<Customer, CustomerModel>> Model => customer => new CustomerModel
    {
        Id = user.Id,
        FirstName = user.Name.FirstName,
        LastName = user.Name.LastName,
        Email = user.Email.Value
    };

    public static Expression<Func<Customer, bool>> Id(long id)
    {
        return customer => customer.Id == id;
    }
}
```
