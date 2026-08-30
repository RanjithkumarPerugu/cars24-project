using Microsoft.AspNetCore.Mvc;
using backend.Models;
using backend.Services;

namespace backend.Controllers;

[ApiController]
[Route("api/notifications")]
public class NotificationController : ControllerBase
{
    private static string? fcmToken;

    private readonly NotificationService _notificationService;

    public NotificationController(
        NotificationService notificationService)
    {
        _notificationService = notificationService;
    }

    // ==========================================
    // SAVE FCM TOKEN
    // ==========================================

    [HttpPost("save-token")]
    public IActionResult SaveToken(
        [FromBody] FcmTokenRequest request)
    {
        if (string.IsNullOrWhiteSpace(request.Token))
        {
            return BadRequest(new
            {
                message = "FCM token is required"
            });
        }

        fcmToken = request.Token;

        Console.WriteLine("=================================");
        Console.WriteLine("FCM Token saved successfully");
        Console.WriteLine($"Token: {fcmToken}");
        Console.WriteLine("=================================");

        return Ok(new
        {
            message = "FCM token saved successfully"
        });
    }

    // ==========================================
    // CHECK TOKEN STATUS
    // ==========================================

    [HttpGet("token-status")]
    public IActionResult GetTokenStatus()
    {
        return Ok(new
        {
            tokenAvailable = !string.IsNullOrEmpty(fcmToken)
        });
    }

    // ==========================================
    // FIREBASE TEST NOTIFICATION
    // ==========================================

    [HttpPost("send-firebase-test")]
    public async Task<IActionResult> SendFirebaseTest()
    {
        if (string.IsNullOrEmpty(fcmToken))
        {
            return BadRequest(new
            {
                message =
                    "No FCM token available. Enable Firebase notifications first."
            });
        }

        await _notificationService.SendNotificationAsync(
            fcmToken,
            "Firebase Test 🔥",
            "Congratulations! Your Firebase push notification is working."
        );

        return Ok(new
        {
            message =
                "Firebase test notification sent successfully"
        });
    }

    // ==========================================
    // APPOINTMENT CONFIRMED
    // ==========================================

    [HttpPost("appointment-confirmed")]
    public async Task<IActionResult> AppointmentConfirmed()
    {
        if (string.IsNullOrEmpty(fcmToken))
        {
            return BadRequest(new
            {
                message =
                    "No FCM token available. Enable notifications first."
            });
        }

        await _notificationService.SendNotificationAsync(
            fcmToken,
            "Appointment Confirmed 📅",
            "Your car inspection appointment has been confirmed."
        );

        return Ok(new
        {
            message =
                "Appointment notification sent successfully"
        });
    }

    // ==========================================
    // BID UPDATED
    // ==========================================

    [HttpPost("bid-updated")]
    public async Task<IActionResult> BidUpdated()
    {
        if (string.IsNullOrEmpty(fcmToken))
        {
            return BadRequest(new
            {
                message =
                    "No FCM token available. Enable notifications first."
            });
        }

        await _notificationService.SendNotificationAsync(
            fcmToken,
            "Bid Updated 💰",
            "A new bid has been placed on your car."
        );

        return Ok(new
        {
            message =
                "Bid update notification sent successfully"
        });
    }

    // ==========================================
    // PRICE DROPPED
    // ==========================================

    [HttpPost("price-dropped")]
    public async Task<IActionResult> PriceDropped()
    {
        if (string.IsNullOrEmpty(fcmToken))
        {
            return BadRequest(new
            {
                message =
                    "No FCM token available. Enable notifications first."
            });
        }

        await _notificationService.SendNotificationAsync(
            fcmToken,
            "Price Dropped 📉",
            "A car in your wishlist has dropped in price."
        );

        return Ok(new
        {
            message =
                "Price drop notification sent successfully"
        });
    }

    // ==========================================
    // NEW MESSAGE
    // ==========================================

    [HttpPost("new-message")]
    public async Task<IActionResult> NewMessage()
    {
        if (string.IsNullOrEmpty(fcmToken))
        {
            return BadRequest(new
            {
                message =
                    "No FCM token available. Enable notifications first."
            });
        }

        await _notificationService.SendNotificationAsync(
            fcmToken,
            "New Message 💬",
            "You have received a new message from CARS24."
        );

        return Ok(new
        {
            message =
                "New message notification sent successfully"
        });
    }
}