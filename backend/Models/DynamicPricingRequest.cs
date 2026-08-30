namespace backend.Models;

public class DynamicPricingRequest
{
    public decimal BasePrice { get; set; }

    public string VehicleType { get; set; } = "";

    public string Region { get; set; } = "";
}