using backend.Services;

var builder = WebApplication.CreateBuilder(args);

// ==========================================
// ADD CONTROLLERS
// ==========================================

builder.Services.AddControllers();

// ==========================================
// REGISTER SERVICES
// ==========================================

// Notification Service
builder.Services.AddSingleton<NotificationService>();

// Dynamic Pricing Service
builder.Services.AddSingleton<DynamicPricingService>();

// Search Service
builder.Services.AddSingleton<SearchService>();

// Geo Location Service
builder.Services.AddSingleton<GeoLocationService>();

// Geo Car Service
builder.Services.AddSingleton<GeoCarService>();

// Nearby Location Service
builder.Services.AddSingleton<NearbyLocationService>();

// Referral Service
builder.Services.AddSingleton<ReferralService>();

// Wallet Service
builder.Services.AddSingleton<WalletService>();

// ==========================================
// MAINTENANCE SERVICE
// ==========================================

builder.Services.AddSingleton<MaintenanceService>();

// ==========================================
// CORS
// ==========================================

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy
            .WithOrigins("http://localhost:3000")
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});

// ==========================================
// BUILD APPLICATION
// ==========================================

var app = builder.Build();

// ==========================================
// ENABLE CORS
// ==========================================

app.UseCors("AllowFrontend");

// ==========================================
// MAP CONTROLLERS
// ==========================================

app.MapControllers();

// ==========================================
// HOME TEST API
// ==========================================

app.MapGet("/", () =>
{
    return Results.Ok(new
    {
        success = true,
        message = "Cars24 Backend API is running!"
    });
});

// ==========================================
// NOTIFICATION TEST API
// ==========================================

app.MapGet("/api/notifications/test", () =>
{
    return Results.Ok(new
    {
        success = true,
        message = "Notification API is working!"
    });
});

// ==========================================
// REFERRAL TEST API
// ==========================================

app.MapGet("/api/referral/test", () =>
{
    return Results.Ok(new
    {
        success = true,
        message = "Referral API is working!"
    });
});

// ==========================================
// WALLET TEST API
// ==========================================

app.MapGet("/api/wallet/test", () =>
{
    return Results.Ok(new
    {
        success = true,
        message = "Wallet API is working!"
    });
});

// ==========================================
// MAINTENANCE TEST API
// ==========================================

app.MapGet("/api/maintenance/test", () =>
{
    return Results.Ok(new
    {
        success = true,
        message = "Maintenance API is working!"
    });
});

// ==========================================
// RUN APPLICATION
// ==========================================

app.Run();