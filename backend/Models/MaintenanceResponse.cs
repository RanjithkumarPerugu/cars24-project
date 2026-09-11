namespace backend.Models;

public class MaintenanceResponse
{
    public string Status { get; set; } = "";

    public int EstimatedMonthlyCost { get; set; }

    public int NextServiceDueInKm { get; set; }

    public List<string> Insights { get; set; } = new();
}
