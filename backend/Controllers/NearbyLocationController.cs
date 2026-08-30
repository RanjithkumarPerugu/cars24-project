using backend.Services;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers;

[ApiController]
[Route("api/nearbylocations")]
public class NearbyLocationController : ControllerBase
{
    private readonly NearbyLocationService _nearbyLocationService;

    public NearbyLocationController(
        NearbyLocationService nearbyLocationService
    )
    {
        _nearbyLocationService = nearbyLocationService;
    }

    // ==========================================
    // GET NEARBY LOCATIONS BY CITY
    // ==========================================

    [HttpGet("city/{city}")]
    public IActionResult GetLocationsByCity(string city)
    {
        var locations =
            _nearbyLocationService.GetLocationsByCity(city);

        return Ok(new
        {
            city = city,
            locations = locations
        });
    }
}