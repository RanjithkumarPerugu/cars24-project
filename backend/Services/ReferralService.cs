namespace backend.Services;

public class ReferralService
{
    // ==========================================
    // REFERRAL USERS
    // ==========================================

    private readonly Dictionary<string, ReferralUser> users =
        new();

    // Referral Code -> User ID
    private readonly Dictionary<string, string> referralCodes =
        new();

    // New User ID -> Referrer User ID
    private readonly Dictionary<string, string> appliedReferrals =
        new();

    // ==========================================
    // CREATE REFERRAL CODE
    // ==========================================

    public ReferralUser CreateReferralCode(
        string userId,
        string userName
    )
    {
        userId = userId.Trim();
        userName = userName.Trim();

        // If user already exists, return existing user

        if (users.ContainsKey(userId))
        {
            return users[userId];
        }

        // Generate unique referral code

        string cleanName = userName
            .Replace(" ", "")
            .ToUpper();

        if (string.IsNullOrWhiteSpace(cleanName))
        {
            cleanName = "USER";
        }

        string referralCode;

        do
        {
            referralCode =
                cleanName.Substring(
                    0,
                    Math.Min(5, cleanName.Length)
                )
                + Random.Shared.Next(1000, 9999);
        }
        while (referralCodes.ContainsKey(referralCode));

        // Create user

        var user = new ReferralUser
        {
            UserId = userId,
            UserName = userName,
            ReferralCode = referralCode,
            ReferredUsers = new List<string>()
        };

        users[userId] = user;

        referralCodes[referralCode] = userId;

        return user;
    }

    // ==========================================
    // APPLY REFERRAL CODE
    // ==========================================

    public ReferralResult ApplyReferralCode(
        string newUserId,
        string referralCode
    )
    {
        newUserId = newUserId.Trim();

        referralCode = referralCode
            .Trim()
            .ToUpper();

        // Check if referral code exists

        if (!referralCodes.ContainsKey(referralCode))
        {
            return new ReferralResult
            {
                Success = false,
                Message = "Invalid referral code."
            };
        }

        string referrerId =
            referralCodes[referralCode];

        // Prevent self referral

        if (
            referrerId.Equals(
                newUserId,
                StringComparison.OrdinalIgnoreCase
            )
        )
        {
            return new ReferralResult
            {
                Success = false,
                Message =
                    "You cannot use your own referral code."
            };
        }

        // Check if new user already used referral

        if (appliedReferrals.ContainsKey(newUserId))
        {
            return new ReferralResult
            {
                Success = false,
                Message =
                    "This user has already used a referral code."
            };
        }

        // Get referrer

        var referrer = users[referrerId];

        // Add referred user

        referrer.ReferredUsers.Add(newUserId);

        // Save referral relationship

        appliedReferrals[newUserId] =
            referrerId;

        return new ReferralResult
        {
            Success = true,

            Message =
                "Referral code applied successfully.",

            ReferrerId = referrerId
        };
    }

    // ==========================================
    // GET REFERRER OF A USER
    // ==========================================

    public string? GetReferrerId(
        string referredUserId
    )
    {
        if (
            appliedReferrals.ContainsKey(
                referredUserId
            )
        )
        {
            return appliedReferrals[
                referredUserId
            ];
        }

        return null;
    }

    // ==========================================
    // GET REFERRAL USER
    // ==========================================

    public ReferralUser? GetReferralUser(
        string userId
    )
    {
        if (users.ContainsKey(userId))
        {
            return users[userId];
        }

        return null;
    }

    // ==========================================
    // GET REFERRED USERS
    // ==========================================

    public List<string> GetReferredUsers(
        string userId
    )
    {
        if (users.ContainsKey(userId))
        {
            return users[userId]
                .ReferredUsers;
        }

        return new List<string>();
    }
}


// ==========================================
// REFERRAL USER MODEL
// ==========================================

public class ReferralUser
{
    public string UserId { get; set; } = "";

    public string UserName { get; set; } = "";

    public string ReferralCode { get; set; } = "";

    public List<string> ReferredUsers { get; set; }
        = new();
}


// ==========================================
// REFERRAL RESULT MODEL
// ==========================================

public class ReferralResult
{
    public bool Success { get; set; }

    public string Message { get; set; } = "";

    public string? ReferrerId { get; set; }
}