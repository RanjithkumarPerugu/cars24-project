using Microsoft.AspNetCore.Mvc;
using backend.Models;
using backend.Services;

namespace backend.Controllers;

[ApiController]
[Route("api/pricing")]
public class DynamicPricingController : ControllerBase
{
    private readonly DynamicPricingService _pricingService;

    public DynamicPricingController(
        DynamicPricingService pricingService)
    {
        _pricingService = pricingService;
    }

    // ==========================================
    // CALCULATE RECOMMENDED PRICE
    // ==========================================

    [HttpPost("calculate")]
    public IActionResult CalculatePrice(
        [FromBody] DynamicPricingRequest request)
    {
        if (request.BasePrice <= 0)
        {
            return BadRequest(new
            {
                message = "Base price must be greater than zero"
            });
        }

        if (string.IsNullOrWhiteSpace(request.VehicleType))
        {
            return BadRequest(new
            {
                message = "Vehicle type is required"
            });
        }

        if (string.IsNullOrWhiteSpace(request.Region))
        {
            return BadRequest(new
            {
                message = "Region is required"
            });
        }

        // Get dynamic pricing result
        PricingResult result =
            _pricingService.CalculateRecommendedPrice(
                request.BasePrice,
                request.VehicleType,
                request.Region
            );

        return Ok(new
        {
            basePrice = request.BasePrice,
            vehicleType = request.VehicleType,
            region = request.Region,

            recommendedPrice =
                result.RecommendedPrice,

            priceDifference =
                result.RecommendedPrice -
                request.BasePrice,

            multiplier =
                result.Multiplier,

            reasons =
                result.Reasons
        });
    }
}