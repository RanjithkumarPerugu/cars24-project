namespace backend.Services;

public class DynamicPricingService
{
    public PricingResult CalculateRecommendedPrice(
        decimal basePrice,
        string vehicleType,
        string region)
    {
        decimal multiplier = 1.0m;

        List<string> reasons = new List<string>();

        int month = DateTime.Now.Month;

        bool isMonsoon =
            month >= 6 && month <= 9;

        // SUV pricing during monsoon
        if (
            vehicleType.ToLower() == "suv"
            && isMonsoon
        )
        {
            multiplier += 0.10m;

            reasons.Add(
                "SUV demand is higher during monsoon season"
            );
        }

        // Off-road vehicles in hilly regions
        if (
            vehicleType.ToLower() == "offroad"
            && region.ToLower() == "hilly"
        )
        {
            multiplier += 0.15m;

            reasons.Add(
                "Off-road vehicles have higher demand in hilly regions"
            );
        }

        // SUV demand in hilly regions
        if (
            vehicleType.ToLower() == "suv"
            && region.ToLower() == "hilly"
        )
        {
            multiplier += 0.10m;

            reasons.Add(
                "SUV demand is higher in hilly regions"
            );
        }

        // Hatchbacks in metro regions
        if (
            vehicleType.ToLower() == "hatchback"
            && region.ToLower() == "metro"
        )
        {
            multiplier -= 0.05m;

            reasons.Add(
                "Small hatchbacks have lower demand in metro areas"
            );
        }

        if (reasons.Count == 0)
        {
            reasons.Add(
                "Standard market conditions applied"
            );
        }

        decimal recommendedPrice =
            Math.Round(
                basePrice * multiplier,
                2
            );

        return new PricingResult
        {
            RecommendedPrice = recommendedPrice,
            Multiplier = multiplier,
            Reasons = reasons
        };
    }
}


// ==========================================
// PRICING RESULT MODEL
// ==========================================

public class PricingResult
{
    public decimal RecommendedPrice { get; set; }

    public decimal Multiplier { get; set; }

    public List<string> Reasons { get; set; } =
        new List<string>();
}