namespace backend.Services;

public class GeoCarService
{
    private readonly List<GeoCar> cars = new()
    {
        new GeoCar
        {
            Id = "creta",
            Brand = "Hyundai",
            Model = "Creta",
            City = "Hyderabad",
            Price = 1200000
        },

        new GeoCar
        {
            Id = "swift",
            Brand = "Maruti",
            Model = "Swift",
            City = "Bangalore",
            Price = 700000
        },

        new GeoCar
        {
            Id = "city",
            Brand = "Honda",
            Model = "City",
            City = "Chennai",
            Price = 1000000
        },

        new GeoCar
        {
            Id = "thar",
            Brand = "Mahindra",
            Model = "Thar",
            City = "Hyderabad",
            Price = 1500000
        },

        new GeoCar
        {
            Id = "seltos",
            Brand = "Kia",
            Model = "Seltos",
            City = "Mumbai",
            Price = 1400000
        },

        new GeoCar
        {
            Id = "venue",
            Brand = "Hyundai",
            Model = "Venue",
            City = "Delhi",
            Price = 1100000
        }
    };

    public List<GeoCar> GetCarsByCity(string city)
    {
        return cars
            .Where(car =>
                car.City.Equals(
                    city,
                    StringComparison.OrdinalIgnoreCase
                )
            )
            .ToList();
    }

    public List<GeoCar> GetAllCars()
    {
        return cars;
    }
}

public class GeoCar
{
    public string Id { get; set; } = "";

    public string Brand { get; set; } = "";

    public string Model { get; set; } = "";

    public string City { get; set; } = "";

    public decimal Price { get; set; }
}