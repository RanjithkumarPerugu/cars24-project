using Microsoft.AspNetCore.Mvc;
using backend.Services;

namespace backend.Controllers;

[ApiController]
[Route("api/geolocation")]
public class GeoLocationController : ControllerBase
{
    private readonly GeoLocationService _geoLocationService;

    public GeoLocationController(
        GeoLocationService geoLocationService
    )
    {
        _geoLocationService = geoLocationService;
    }

    // ==========================================
    // DETECT CITY FROM GPS COORDINATES
    // ==========================================

    [HttpPost("detect")]
    public IActionResult DetectCity(
        [FromBody] LocationRequest request
    )
    {
        var city =
            _geoLocationService.DetectCityFromCoordinates(
                request.Latitude,
                request.Longitude
            );

        return Ok(new
        {
            city = city
        });
    }

    // ==========================================
    // GET SUPPORTED CITIES
    // ==========================================

    [HttpGet("cities")]
    public IActionResult GetCities()
    {
        var cities =
            _geoLocationService.GetSupportedCities();

        return Ok(new
        {
            cities = cities
        });
    }
}


// ==========================================
// LOCATION REQUEST MODEL
// ==========================================

public class LocationRequest
{
    public double Latitude { get; set; }

    public double Longitude { get; set; }
}