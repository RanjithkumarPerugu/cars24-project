using Microsoft.AspNetCore.Mvc;
using backend.Models;
using backend.Services;

namespace backend.Controllers;

[ApiController]
[Route("api/search")]
public class SearchController : ControllerBase
{
    private readonly SearchService _searchService;

    public SearchController(
        SearchService searchService)
    {
        _searchService = searchService;
    }

    // ==========================================
    // SEARCH CARS
    // ==========================================

    [HttpPost]
    public IActionResult SearchCars(
        [FromBody] CarSearchRequest request)
    {
        var results =
            _searchService.SearchCars(request);

        return Ok(new
        {
            count = results.Count,
            results = results
        });
    }

    // ==========================================
    // AUTO SUGGESTIONS
    // ==========================================

    [HttpGet("suggestions")]
    public IActionResult GetSuggestions(
        [FromQuery] string query)
    {
        var suggestions =
            _searchService.GetSuggestions(query);

        return Ok(new
        {
            suggestions = suggestions
        });
    }
}