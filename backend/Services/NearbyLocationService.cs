namespace backend.Services;

public class NearbyLocationService
{
    public List<NearbyLocation> GetLocationsByCity(string city)
    {
        var locations = new List<NearbyLocation>
        {
            // ==========================================
            // CHENNAI
            // ==========================================

            new NearbyLocation
            {
                Id = 1,
                Name = "Cars24 Service Center Chennai",
                City = "Chennai",
                Type = "Service Center",
                Address = "OMR Road, Chennai",
                Latitude = 13.0628,
                Longitude = 80.2496
            },

            new NearbyLocation
            {
                Id = 2,
                Name = "Cars24 Pickup Hub Chennai",
                City = "Chennai",
                Type = "Pickup Point",
                Address = "Velachery, Chennai",
                Latitude = 12.9815,
                Longitude = 80.2180
            },

            // ==========================================
            // HYDERABAD
            // ==========================================

            new NearbyLocation
            {
                Id = 3,
                Name = "Cars24 Service Center Hyderabad",
                City = "Hyderabad",
                Type = "Service Center",
                Address = "Hitech City, Hyderabad",
                Latitude = 17.4435,
                Longitude = 78.3772
            },

            new NearbyLocation
            {
                Id = 4,
                Name = "Cars24 Pickup Hub Hyderabad",
                City = "Hyderabad",
                Type = "Pickup Point",
                Address = "Gachibowli, Hyderabad",
                Latitude = 17.4401,
                Longitude = 78.3489
            },

            // ==========================================
            // BANGALORE
            // ==========================================

            new NearbyLocation
            {
                Id = 5,
                Name = "Cars24 Service Center Bangalore",
                City = "Bangalore",
                Type = "Service Center",
                Address = "Whitefield, Bangalore",
                Latitude = 12.9698,
                Longitude = 77.7499
            },

            new NearbyLocation
            {
                Id = 6,
                Name = "Cars24 Pickup Hub Bangalore",
                City = "Bangalore",
                Type = "Pickup Point",
                Address = "Koramangala, Bangalore",
                Latitude = 12.9352,
                Longitude = 77.6245
            },

            // ==========================================
            // MUMBAI
            // ==========================================

            new NearbyLocation
            {
                Id = 7,
                Name = "Cars24 Service Center Mumbai",
                City = "Mumbai",
                Type = "Service Center",
                Address = "Andheri, Mumbai",
                Latitude = 19.1197,
                Longitude = 72.8468
            },

            new NearbyLocation
            {
                Id = 8,
                Name = "Cars24 Pickup Hub Mumbai",
                City = "Mumbai",
                Type = "Pickup Point",
                Address = "Powai, Mumbai",
                Latitude = 19.1176,
                Longitude = 72.9060
            },

            // ==========================================
            // DELHI
            // ==========================================

            new NearbyLocation
            {
                Id = 9,
                Name = "Cars24 Service Center Delhi",
                City = "Delhi",
                Type = "Service Center",
                Address = "Saket, Delhi",
                Latitude = 28.5244,
                Longitude = 77.2066
            },

            new NearbyLocation
            {
                Id = 10,
                Name = "Cars24 Pickup Hub Delhi",
                City = "Delhi",
                Type = "Pickup Point",
                Address = "Dwarka, Delhi",
                Latitude = 28.5921,
                Longitude = 77.0460
            }
        };

        return locations
            .Where(location =>
                location.City.Equals(
                    city,
                    StringComparison.OrdinalIgnoreCase
                )
            )
            .ToList();
    }
}


// ==========================================
// NEARBY LOCATION MODEL
// ==========================================

public class NearbyLocation
{
    public int Id { get; set; }

    public string Name { get; set; } = "";

    public string City { get; set; } = "";

    public string Type { get; set; } = "";

    public string Address { get; set; } = "";

    public double Latitude { get; set; }

    public double Longitude { get; set; }
}