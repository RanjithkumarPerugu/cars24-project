using Microsoft.AspNetCore.Mvc;
using backend.Services;

namespace backend.Controllers;

[ApiController]
[Route("api/geocars")]
public class GeoCarController : ControllerBase
{
    private readonly GeoCarService _geoCarService;

    public GeoCarController(GeoCarService geoCarService)
    {
        _geoCarService = geoCarService;
    }

    // ==========================================
    // GET ALL CARS
    // ==========================================

    [HttpGet]
    public IActionResult GetAllCars()
    {
        var cars = _geoCarService.GetAllCars();

        return Ok(new
        {
            totalCars = cars.Count,
            cars = cars
        });
    }

    // ==========================================
    // GET CARS BY CITY
    // ==========================================

    [HttpGet("city/{city}")]
    public IActionResult GetCarsByCity(string city)
    {
        var cars = _geoCarService.GetCarsByCity(city);

        return Ok(new
        {
            city = city,
            totalCars = cars.Count,
            cars = cars
        });
    }
}