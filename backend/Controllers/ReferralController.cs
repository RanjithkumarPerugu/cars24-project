using Microsoft.AspNetCore.Mvc;
using backend.Services;

namespace backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ReferralController : ControllerBase
{
    private readonly ReferralService _referralService;
    private readonly WalletService _walletService;

    public ReferralController(
        ReferralService referralService,
        WalletService walletService
    )
    {
        _referralService = referralService;
        _walletService = walletService;
    }


    // ==========================================
    // CREATE REFERRAL CODE
    // POST: /api/referral/create
    // ==========================================

    [HttpPost("create")]
    public IActionResult CreateReferralCode(
        [FromBody] CreateReferralRequest request
    )
    {
        if (
            request == null ||
            string.IsNullOrWhiteSpace(request.UserId) ||
            string.IsNullOrWhiteSpace(request.UserName)
        )
        {
            return BadRequest(new
            {
                success = false,
                message =
                    "User ID and User Name are required."
            });
        }

        var user =
            _referralService.CreateReferralCode(
                request.UserId,
                request.UserName
            );

        return Ok(new
        {
            success = true,

            message =
                "Referral code created successfully.",

            userId = user.UserId,

            userName = user.UserName,

            referralCode = user.ReferralCode
        });
    }


    // ==========================================
    // APPLY REFERRAL CODE
    // POST: /api/referral/apply
    // ==========================================

    [HttpPost("apply")]
    public IActionResult ApplyReferralCode(
        [FromBody] ApplyReferralRequest request
    )
    {
        if (
            request == null ||
            string.IsNullOrWhiteSpace(
                request.NewUserId
            ) ||
            string.IsNullOrWhiteSpace(
                request.ReferralCode
            )
        )
        {
            return BadRequest(new
            {
                success = false,

                message =
                    "New User ID and Referral Code are required."
            });
        }

        var result =
            _referralService.ApplyReferralCode(
                request.NewUserId,
                request.ReferralCode
            );

        if (!result.Success)
        {
            return BadRequest(result);
        }

        return Ok(result);
    }


    // ==========================================
    // COMPLETE REFERRAL TRANSACTION
    // POST: /api/referral/complete
    // ==========================================

    [HttpPost("complete")]
    public IActionResult CompleteReferral(
        [FromBody] CompleteReferralRequest request
    )
    {
        if (
            request == null ||
            string.IsNullOrWhiteSpace(
                request.ReferredUserId
            )
        )
        {
            return BadRequest(new
            {
                success = false,

                message =
                    "Referred User ID is required."
            });
        }

        // Automatically find referrer

        var referrerId =
            _referralService.GetReferrerId(
                request.ReferredUserId
            );

        // Check referral was actually applied

        if (string.IsNullOrWhiteSpace(referrerId))
        {
            return BadRequest(new
            {
                success = false,

                message =
                    "Referral code must be applied before completing the transaction."
            });
        }

        // Add 500 points to referrer

        _walletService.AddPoints(
            referrerId,
            500,
            "Referral reward: Referred user completed a transaction"
        );

        // Add 250 points to referred user

        _walletService.AddPoints(
            request.ReferredUserId,
            250,
            "Welcome reward: Referral transaction completed"
        );

        return Ok(new
        {
            success = true,

            message =
                "Referral completed and reward points added.",

            referrerId = referrerId,

            referredUserId =
                request.ReferredUserId,

            referrerReward = 500,

            referredUserReward = 250
        });
    }


    // ==========================================
    // GET REFERRAL USER
    // GET: /api/referral/user/{userId}
    // ==========================================

    [HttpGet("user/{userId}")]
    public IActionResult GetReferralUser(
        string userId
    )
    {
        var user =
            _referralService.GetReferralUser(
                userId
            );

        if (user == null)
        {
            return NotFound(new
            {
                success = false,

                message =
                    "Referral user not found."
            });
        }

        return Ok(new
        {
            success = true,

            userId = user.UserId,

            userName = user.UserName,

            referralCode =
                user.ReferralCode,

            totalReferrals =
                user.ReferredUsers.Count,

            referredUsers =
                user.ReferredUsers
        });
    }


    // ==========================================
    // GET REFERRED USERS
    // GET: /api/referral/users/{userId}
    // ==========================================

    [HttpGet("users/{userId}")]
    public IActionResult GetReferredUsers(
        string userId
    )
    {
        var users =
            _referralService.GetReferredUsers(
                userId
            );

        return Ok(new
        {
            success = true,

            totalReferrals =
                users.Count,

            referredUsers =
                users
        });
    }
}


// ==========================================
// CREATE REFERRAL REQUEST
// ==========================================

public class CreateReferralRequest
{
    public string UserId { get; set; } = "";

    public string UserName { get; set; } = "";
}


// ==========================================
// APPLY REFERRAL REQUEST
// ==========================================

public class ApplyReferralRequest
{
    public string NewUserId { get; set; } = "";

    public string ReferralCode { get; set; } = "";
}


// ==========================================
// COMPLETE REFERRAL REQUEST
// ==========================================

public class CompleteReferralRequest
{
    public string ReferredUserId { get; set; } = "";
}