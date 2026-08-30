namespace backend.Services;

public class WalletService
{
    // ==========================================
    // STORE USER WALLETS
    // ==========================================

    private readonly Dictionary<string, Wallet> wallets = new();

    // ==========================================
    // GET OR CREATE WALLET
    // ==========================================

    private Wallet GetOrCreateWallet(string userId)
    {
        if (!wallets.ContainsKey(userId))
        {
            wallets[userId] = new Wallet
            {
                UserId = userId,
                CurrentBalance = 0,
                TotalPointsEarned = 0,
                Transactions = new List<WalletTransaction>()
            };
        }

        return wallets[userId];
    }

    // ==========================================
    // ADD POINTS
    // ==========================================

    public WalletTransaction AddPoints(
        string userId,
        int points,
        string description
    )
    {
        var wallet = GetOrCreateWallet(userId);

        wallet.CurrentBalance += points;
        wallet.TotalPointsEarned += points;

        var transaction = new WalletTransaction
        {
            Id = Guid.NewGuid().ToString(),
            Type = "Credit",
            Points = points,
            Description = description,
            Date = DateTime.Now
        };

        wallet.Transactions.Add(transaction);

        return transaction;
    }

    // ==========================================
    // REDEEM POINTS
    // ==========================================

    public WalletResult RedeemPoints(
        string userId,
        int points,
        string description
    )
    {
        var wallet = GetOrCreateWallet(userId);

        if (points <= 0)
        {
            return new WalletResult
            {
                Success = false,
                Message = "Please enter valid points."
            };
        }

        if (wallet.CurrentBalance < points)
        {
            return new WalletResult
            {
                Success = false,
                Message = "Insufficient points.",
                CurrentBalance = wallet.CurrentBalance
            };
        }

        wallet.CurrentBalance -= points;

        var transaction = new WalletTransaction
        {
            Id = Guid.NewGuid().ToString(),
            Type = "Debit",
            Points = points,
            Description = description,
            Date = DateTime.Now
        };

        wallet.Transactions.Add(transaction);

        return new WalletResult
        {
            Success = true,
            Message = $"{points} points redeemed successfully.",
            CurrentBalance = wallet.CurrentBalance,
            Transaction = transaction
        };
    }

    // ==========================================
    // GET WALLET
    // ==========================================

    public Wallet? GetWallet(string userId)
    {
        if (wallets.ContainsKey(userId))
        {
            return wallets[userId];
        }

        return null;
    }

    // ==========================================
    // GET TRANSACTION HISTORY
    // ==========================================

    public List<WalletTransaction> GetTransactions(
        string userId
    )
    {
        var wallet = GetOrCreateWallet(userId);

        return wallet.Transactions;
    }
}


// ==========================================
// WALLET MODEL
// ==========================================

public class Wallet
{
    public string UserId { get; set; } = "";

    public int CurrentBalance { get; set; }

    public int TotalPointsEarned { get; set; }

    public List<WalletTransaction> Transactions { get; set; }
        = new();
}


// ==========================================
// WALLET TRANSACTION MODEL
// ==========================================

public class WalletTransaction
{
    public string Id { get; set; } = "";

    public string Type { get; set; } = "";

    public int Points { get; set; }

    public string Description { get; set; } = "";

    public DateTime Date { get; set; }
}


// ==========================================
// WALLET RESULT MODEL
// ==========================================

public class WalletResult
{
    public bool Success { get; set; }

    public string Message { get; set; } = "";

    public int CurrentBalance { get; set; }

    public WalletTransaction? Transaction { get; set; }
}