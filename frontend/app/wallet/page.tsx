"use client";

import { useState } from "react";

export default function WalletPage() {
  const [userId, setUserId] = useState("");
  const [wallet, setWallet] = useState<any>(null);

  const [redeemPoints, setRedeemPoints] = useState("");
  const [message, setMessage] = useState("");

  const API_URL = "http://localhost:5133";

  // ==========================================
  // GET WALLET
  // ==========================================

  const getWallet = async () => {
    try {
      if (!userId.trim()) {
        setMessage("Please enter User ID.");
        return;
      }

      setMessage("Loading wallet...");

      const response = await fetch(
        `${API_URL}/api/wallet/${userId.trim()}`
      );

      const data = await response.json();

      console.log("Wallet response:", data);

      if (response.ok) {
        setWallet(data);
        setMessage("Wallet loaded successfully!");
      } else {
        setWallet(null);
        setMessage(
          `Error: ${data.message || "Failed to load wallet."}`
        );
      }
    } catch (error) {
      console.error(error);

      setMessage(
        "Backend connection failed. Check if backend is running."
      );
    }
  };

  // ==========================================
  // REDEEM POINTS
  // ==========================================

  const redeem = async () => {
    try {
      const points = Number(redeemPoints);

      if (!userId.trim()) {
        setMessage("Please enter User ID.");
        return;
      }

      if (!points || points <= 0) {
        setMessage("Please enter valid points.");
        return;
      }

      setMessage("Redeeming points...");

      const response = await fetch(
        `${API_URL}/api/wallet/redeem`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            userId: userId.trim(),
            points: points,
            description: "Platform Discount",
          }),
        }
      );

      const data = await response.json();

      console.log("Redeem response:", data);

      if (response.ok) {
        setMessage(
          data.message || "Points redeemed successfully!"
        );

        setRedeemPoints("");

        // Reload wallet
        getWallet();
      } else {
        setMessage(
          `Error: ${data.message || "Failed to redeem points."}`
        );
      }
    } catch (error) {
      console.error(error);

      setMessage(
        "Backend connection failed. Check if backend is running."
      );
    }
  };

  return (
    <div className="mx-auto max-w-4xl px-6 py-12">

      {/* TITLE */}

      <h1 className="text-center text-3xl font-bold">
        My Points Wallet
      </h1>

      <p className="mt-2 text-center text-gray-600">
        View your points, transaction history and redeem rewards
      </p>


      {/* MESSAGE */}

      {message && (
        <div className="mx-auto mt-6 max-w-xl rounded-lg bg-blue-50 p-4 text-center text-blue-700">
          {message}
        </div>
      )}


      {/* USER ID */}

      <div className="mt-8 rounded-xl border bg-white p-6 shadow">

        <h2 className="text-xl font-bold">
          View Wallet
        </h2>

        <input
          type="text"
          placeholder="Enter User ID"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          className="mt-4 w-full rounded-lg border p-3"
        />

        <button
          onClick={getWallet}
          className="mt-4 rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white"
        >
          View Wallet
        </button>

      </div>


      {/* WALLET DETAILS */}

      {wallet && (
        <div className="mt-8 rounded-xl border bg-white p-6 shadow">

          <h2 className="text-xl font-bold">
            Wallet Details
          </h2>

          <div className="mt-5 grid gap-4 md:grid-cols-2">

            <div className="rounded-lg bg-green-50 p-5">

              <p className="text-sm text-gray-600">
                Current Balance
              </p>

              <p className="mt-2 text-3xl font-bold text-green-600">
                {wallet.currentBalance ?? wallet.balance ?? 0}
              </p>

              <p className="text-sm text-gray-600">
                Points
              </p>

            </div>


            <div className="rounded-lg bg-blue-50 p-5">

              <p className="text-sm text-gray-600">
                Total Points Earned
              </p>

              <p className="mt-2 text-3xl font-bold text-blue-600">
                {wallet.totalPointsEarned ?? 0}
              </p>

              <p className="text-sm text-gray-600">
                Points
              </p>

            </div>

          </div>


          {/* TRANSACTION HISTORY */}

          <div className="mt-8">

            <h2 className="text-xl font-bold">
              Transaction History
            </h2>

            {wallet.transactions &&
            wallet.transactions.length > 0 ? (

              <div className="mt-4 space-y-3">

                {wallet.transactions.map(
                  (transaction: any, index: number) => (

                    <div
                      key={index}
                      className="flex items-center justify-between rounded-lg border p-4"
                    >

                      <div>

                        <p className="font-semibold">
                          {transaction.description}
                        </p>

                        <p className="text-sm text-gray-500">
                          {transaction.type}
                        </p>

                      </div>


                      <div
                        className={
                          transaction.points > 0
                            ? "font-bold text-green-600"
                            : "font-bold text-red-600"
                        }
                      >
                        {transaction.points > 0 ? "+" : ""}
                        {transaction.points} Points
                      </div>

                    </div>

                  )
                )}

              </div>

            ) : (

              <p className="mt-4 text-gray-500">
                No transactions found.
              </p>

            )}

          </div>


          {/* REDEEM */}

          <div className="mt-8 border-t pt-6">

            <h2 className="text-xl font-bold">
              Redeem Points
            </h2>

            <p className="mt-2 text-gray-600">
              Redeem your points for platform discounts.
            </p>

            <input
              type="number"
              placeholder="Enter points to redeem"
              value={redeemPoints}
              onChange={(e) =>
                setRedeemPoints(e.target.value)
              }
              className="mt-4 w-full rounded-lg border p-3"
            />

            <button
              onClick={redeem}
              className="mt-4 rounded-lg bg-purple-600 px-5 py-3 font-semibold text-white"
            >
              Redeem Points
            </button>

          </div>

        </div>
      )}

    </div>
  );
}