namespace backend.Models;

public class CarSearchRequest
{
    public string? Query { get; set; }

    public string? FuelType { get; set; }

    public int? MinYear { get; set; }

    public int? MaxYear { get; set; }

    public int? MinMileage { get; set; }

    public int? MaxMileage { get; set; }

    public string? Transmission { get; set; }

    public string? Brand { get; set; }
}