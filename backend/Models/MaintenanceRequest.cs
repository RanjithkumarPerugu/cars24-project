namespace backend.Models;

public class MaintenanceRequest
{
    public string Brand { get; set; } = "";
    public string Model { get; set; } = "";
    public int Age { get; set; }
    public int Kilometers { get; set; }
    public int LastServiceKm { get; set; }
}