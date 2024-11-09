using ChatAppAPI.Services;
using Microsoft.Extensions.Options;
using MongoDB.Driver;
using ChatAppAPI.Models;
using System.Text;
using ChatAppAPI.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Configure MongoDB settings
builder.Services.Configure<MongoDbSettings>(
    builder.Configuration.GetSection("MongoDB"));  // Correct way to configure options

builder.Services.AddSingleton<IMongoClient>(s =>
    new MongoClient(s.GetRequiredService<IOptions<MongoDbSettings>>().Value.ConnectionString));



builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowSpecificOrigin", builder =>
    {
        builder.WithOrigins("http://localhost:4200")
               .AllowAnyHeader()
               .AllowAnyMethod();
    });
});

//builder.Services.AddSingleton<IMongoClient>(s =>
//{
//    var settings = s.GetRequiredService<IOptions<MongoDbSettings>>().Value;
//    return new MongoClient(settings.ConnectionString);
//});

// Register IMongoDatabase
builder.Services.AddScoped<IMongoDatabase>(s =>
{
    var client = s.GetRequiredService<IMongoClient>();
    var settings = s.GetRequiredService<IOptions<MongoDbSettings>>().Value;
    return client.GetDatabase(settings.DatabaseName);
});

// Register services
builder.Services.AddScoped<MessageService>();
builder.Services.AddScoped<RoomService>();
builder.Services.AddScoped<UserService>();


builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();


builder.Services.AddScoped<JwtService>();


var secret = Environment.GetEnvironmentVariable("JWT_SECRET")
             ?? throw new InvalidOperationException("JWT secret key is not set in environment variables.");
var key = Encoding.UTF8.GetBytes(secret);

builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.RequireHttpsMetadata = false;
    options.SaveToken = true;
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = new SymmetricSecurityKey(key),
        ValidateIssuer = false,
        ValidateAudience = false
    };
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors("AllowSpecificOrigin");
app.UseAuthorization();

app.MapControllers();

app.Run();
