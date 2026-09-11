namespace backend.Models;

public class CarSearchResult
{
    public string Id { get; set; } = "";

    public string Brand { get; set; } = "";

    public string Model { get; set; } = "";

    public int Year { get; set; }

    public decimal Price { get; set; }

    public string FuelType { get; set; } = "";

    public int Mileage { get; set; }

    public string Transmission { get; set; } = "";

    public int Popularity { get; set; }

    public DateTime ListedDate { get; set; }

    public double RelevanceScore { get; set; }
}
