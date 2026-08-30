namespace backend.Services;

public class GeoLocationService
{
    // ==========================================
    // SUPPORTED CITIES
    // ==========================================

    private readonly List<string> supportedCities = new()
    {
        "Hyderabad",
        "Bangalore",
        "Chennai",
        "Mumbai",
        "Delhi"
    };

    // ==========================================
    // CHECK WHETHER CITY IS SUPPORTED
    // ==========================================

    public bool IsSupportedCity(string city)
    {
        return supportedCities.Any(c =>
            c.Equals(
                city,
                StringComparison.OrdinalIgnoreCase
            )
        );
    }

    // ==========================================
    // GET ALL SUPPORTED CITIES
    // ==========================================

    public List<string> GetSupportedCities()
    {
        return supportedCities;
    }

    // ==========================================
    // DETECT CITY FROM GPS COORDINATES
    // ==========================================

    public string DetectCityFromCoordinates(
        double latitude,
        double longitude
    )
    {
        // Hyderabad
        if (
            latitude >= 17.2 &&
            latitude <= 17.6 &&
            longitude >= 78.2 &&
            longitude <= 78.7
        )
        {
            return "Hyderabad";
        }

        // Bangalore
        if (
            latitude >= 12.8 &&
            latitude <= 13.2 &&
            longitude >= 77.4 &&
            longitude <= 77.8
        )
        {
            return "Bangalore";
        }

        // Chennai
        if (
            latitude >= 12.8 &&
            latitude <= 13.3 &&
            longitude >= 80.0 &&
            longitude <= 80.4
        )
        {
            return "Chennai";
        }

        // Mumbai
        if (
            latitude >= 18.8 &&
            latitude <= 19.4 &&
            longitude >= 72.7 &&
            longitude <= 73.1
        )
        {
            return "Mumbai";
        }

        // Delhi
        if (
            latitude >= 28.4 &&
            latitude <= 28.9 &&
            longitude >= 76.8 &&
            longitude <= 77.4
        )
        {
            return "Delhi";
        }

        return "Unknown";
    }
}