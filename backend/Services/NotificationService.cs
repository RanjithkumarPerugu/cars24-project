using FirebaseAdmin.Messaging;

namespace backend.Services;

public class NotificationService
{
    public async Task SendNotificationAsync(
        string token,
        string title,
        string message)
    {
        var notificationMessage = new Message()
        {
            Token = token,

            Notification = new Notification()
            {
                Title = title,
                Body = message
            }
        };

        string response = await FirebaseMessaging.DefaultInstance
            .SendAsync(notificationMessage);

        Console.WriteLine("=================================");
        Console.WriteLine("FIREBASE NOTIFICATION SENT");
        Console.WriteLine($"Message ID: {response}");
        Console.WriteLine($"Title: {title}");
        Console.WriteLine($"Message: {message}");
        Console.WriteLine("=================================");
    }
}