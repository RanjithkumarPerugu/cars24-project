using Microsoft.AspNetCore.Mvc;
using backend.Models;
using backend.Services;

namespace backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class MaintenanceController : ControllerBase
{
    private readonly MaintenanceService _maintenanceService;

    public MaintenanceController(MaintenanceService maintenanceService)
    {
        _maintenanceService = maintenanceService;
    }

    [HttpPost("calculate")]
    public ActionResult<MaintenanceResponse> Calculate(
        [FromBody] MaintenanceRequest request
    )
    {
        var result = _maintenanceService.Calculate(request);

        return Ok(result);
    }
}