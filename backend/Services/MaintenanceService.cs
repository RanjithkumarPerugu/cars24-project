using backend.Models;

namespace backend.Services;

public class MaintenanceService
{
    private readonly Dictionary<string, int> baseCosts = new()
    {
        { "Hyundai-Creta", 2500 },
        { "Hyundai-Venue", 2200 },
        { "Hyundai-i20", 2000 },

        { "Maruti-Swift", 1800 },
        { "Maruti-Baleno", 2000 },
        { "Maruti-Brezza", 2300 },

        { "Honda-City", 2800 },
        { "Honda-Amaze", 2200 },

        { "Tata-Nexon", 2400 },
        { "Tata-Punch", 2000 },
        { "Tata-Altroz", 2100 },

        { "Mahindra-XUV700", 3500 },
        { "Mahindra-Scorpio", 3200 }
    };

    public MaintenanceResponse Calculate(MaintenanceRequest request)
    {
        var carKey = $"{request.Brand}-{request.Model}";

        var baseCost = baseCosts.ContainsKey(carKey)
            ? baseCosts[carKey]
            : 2000;

        double multiplier = 1;
        string status = "Low Maintenance Expected";

        if (request.Age >= 6 || request.Kilometers >= 80000)
        {
            multiplier = 1.8;
            status = "High Maintenance Expected";
        }
        else if (request.Age >= 3 || request.Kilometers >= 40000)
        {
            multiplier = 1.3;
            status = "Moderate Maintenance Expected";
        }

        var finalCost = (int)Math.Round(baseCost * multiplier);

        const int serviceInterval = 10000;

        var distanceSinceService =
            request.Kilometers - request.LastServiceKm;

        var remainingKm =
            serviceInterval - distanceSinceService;

        var insights = new List<string>();

        if (remainingKm <= 0)
        {
            remainingKm = 0;
            insights.Add("Major service is due now or overdue");
        }
        else
        {
            insights.Add(
                $"Next major service due in approximately {remainingKm:N0} km"
            );
        }

        if (request.Kilometers >= 40000)
        {
            insights.Add(
                "Check brake pad condition; replacement may be needed soon"
            );
        }
        else
        {
            insights.Add(
                "Brake pads are expected to be in normal condition"
            );
        }

        if (request.Kilometers >= 50000)
        {
            insights.Add(
                "Inspect tire wear; tire replacement may be needed soon"
            );
        }
        else
        {
            insights.Add(
                "Tires are expected to have useful life remaining"
            );
        }

        return new MaintenanceResponse
        {
            Status = status,
            EstimatedMonthlyCost = finalCost,
            NextServiceDueInKm = remainingKm,
            Insights = insights
        };
    }
}