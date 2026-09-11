using backend.Services;

var builder = WebApplication.CreateBuilder(args);

// ==========================================
// ADD CONTROLLERS
// ==========================================

builder.Services.AddControllers();

// ==========================================
// SWAGGER
// ==========================================

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// ==========================================
// REGISTER SERVICES
// ==========================================

builder.Services.AddScoped<DynamicPricingService>();

builder.Services.AddScoped<NearbyLocationService>();

builder.Services.AddScoped<GeoCarService>();

builder.Services.AddSingleton<ReferralService>();

builder.Services.AddSingleton<WalletService>();

builder.Services.AddScoped<MaintenanceService>();

// ==========================================
// CORS
// ==========================================

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy
            .AllowAnyOrigin()
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});

// ==========================================
// BUILD APPLICATION
// ==========================================

var app = builder.Build();

// ==========================================
// SWAGGER
// ==========================================

app.UseSwagger();
app.UseSwaggerUI();

// ==========================================
// CORS
// ==========================================

app.UseCors("AllowFrontend");

// ==========================================
// AUTHORIZATION
// ==========================================

app.UseAuthorization();

// ==========================================
// MAP CONTROLLERS
// ==========================================

app.MapControllers();

// ==========================================
// RUN APPLICATION
// ==========================================

app.Run();