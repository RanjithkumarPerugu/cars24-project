using Microsoft.AspNetCore.Mvc;
using backend.Services;

namespace backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class WalletController : ControllerBase
{
    private readonly WalletService _walletService;

    public WalletController(WalletService walletService)
    {
        _walletService = walletService;
    }

    // ==========================================
    // GET USER WALLET
    // GET: /api/wallet/{userId}
    // ==========================================

    [HttpGet("{userId}")]
    public IActionResult GetWallet(string userId)
    {
        var wallet = _walletService.GetWallet(userId);

        if (wallet == null)
        {
            return Ok(new
            {
                success = true,
                userId = userId,
                currentBalance = 0,
                totalPointsEarned = 0,
                transactions = new List<WalletTransaction>()
            });
        }

        return Ok(new
        {
            success = true,
            userId = wallet.UserId,
            currentBalance = wallet.CurrentBalance,
            totalPointsEarned = wallet.TotalPointsEarned,
            transactions = wallet.Transactions
        });
    }

    // ==========================================
    // GET TRANSACTION HISTORY
    // GET: /api/wallet/{userId}/transactions
    // ==========================================

    [HttpGet("{userId}/transactions")]
    public IActionResult GetTransactions(string userId)
    {
        var transactions =
            _walletService.GetTransactions(userId);

        return Ok(new
        {
            success = true,
            userId = userId,
            transactions = transactions
        });
    }

    // ==========================================
    // ADD POINTS
    // POST: /api/wallet/add
    // ==========================================

    [HttpPost("add")]
    public IActionResult AddPoints(
        [FromBody] AddPointsRequest request
    )
    {
        if (
            string.IsNullOrWhiteSpace(request.UserId) ||
            request.Points <= 0
        )
        {
            return BadRequest(new
            {
                success = false,
                message = "Valid User ID and points are required."
            });
        }

        var transaction = _walletService.AddPoints(
            request.UserId,
            request.Points,
            request.Description
        );

        var wallet = _walletService.GetWallet(
            request.UserId
        );

        return Ok(new
        {
            success = true,
            message = "Points added successfully.",
            currentBalance = wallet?.CurrentBalance ?? 0,
            transaction = transaction
        });
    }

    // ==========================================
    // REDEEM POINTS
    // POST: /api/wallet/redeem
    // ==========================================

    [HttpPost("redeem")]
    public IActionResult RedeemPoints(
        [FromBody] RedeemPointsRequest request
    )
    {
        if (
            string.IsNullOrWhiteSpace(request.UserId)
        )
        {
            return BadRequest(new
            {
                success = false,
                message = "User ID is required."
            });
        }

        if (request.Points <= 0)
        {
            return BadRequest(new
            {
                success = false,
                message = "Please enter valid points."
            });
        }

        var result = _walletService.RedeemPoints(
            request.UserId,
            request.Points,
            "Platform Discount"
        );

        if (!result.Success)
        {
            return BadRequest(new
            {
                success = false,
                message = result.Message,
                currentBalance = result.CurrentBalance
            });
        }

        return Ok(new
        {
            success = true,
            message = result.Message,
            currentBalance = result.CurrentBalance,
            transaction = result.Transaction
        });
    }
}


// ==========================================
// ADD POINTS REQUEST
// ==========================================

public class AddPointsRequest
{
    public string UserId { get; set; } = "";

    public int Points { get; set; }

    public string Description { get; set; } =
        "Points added";
}


// ==========================================
// REDEEM POINTS REQUEST
// ==========================================

public class RedeemPointsRequest
{
    public string UserId { get; set; } = "";

    public int Points { get; set; }
}