"use client";

import { useState } from "react";
import Navbar from "../../components/Navbar";

export default function WalletPage() {
  const [userId, setUserId] = useState("");
  const [wallet, setWallet] = useState<any>(null);

  const [redeemPoints, setRedeemPoints] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState("");

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

      setLoading("wallet");
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

      setWallet(null);

      setMessage(
        "Backend connection failed. Check if backend is running."
      );
    } finally {
      setLoading("");
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

      const currentBalance =
        wallet?.currentBalance ?? wallet?.balance ?? 0;

      if (points > currentBalance) {
        setMessage(
          "Error: You do not have enough points to redeem."
        );
        return;
      }

      setLoading("redeem");
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

        // Reload wallet after redeeming
        const walletResponse = await fetch(
          `${API_URL}/api/wallet/${userId.trim()}`
        );

        const walletData = await walletResponse.json();

        if (walletResponse.ok) {
          setWallet(walletData);
        }
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
    } finally {
      setLoading("");
    }
  };

  // ==========================================
  // RESET WALLET
  // ==========================================

  const resetWallet = () => {
    setUserId("");
    setWallet(null);
    setRedeemPoints("");
    setMessage("");
  };

  // ==========================================
  // GET BALANCE
  // ==========================================

  const currentBalance =
    wallet?.currentBalance ?? wallet?.balance ?? 0;

  const totalEarned =
    wallet?.totalPointsEarned ?? 0;

  // ==========================================
  // PAGE UI
  // ==========================================

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <main className="px-4 py-8 sm:px-6 sm:py-10 lg:px-8 lg:py-12">
        <div className="mx-auto w-full max-w-5xl">

          {/* TITLE */}

          <div className="text-center">

            <div className="mb-3 inline-block rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-700">
              💳 Rewards Wallet
            </div>

            <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              My Points Wallet
            </h1>

            <p className="mx-auto mt-3 max-w-2xl text-sm text-gray-600 sm:text-base">
              View your reward points, transaction history and redeem
              points for platform discounts.
            </p>

          </div>


          {/* MESSAGE */}

          {message && (
            <div className="mx-auto mt-6 max-w-3xl rounded-xl border border-blue-200 bg-blue-50 p-4 text-center text-sm font-medium text-blue-700 sm:text-base">
              {message}
            </div>
          )}


          {/* VIEW WALLET */}

          <div className="mx-auto mt-8 max-w-2xl rounded-2xl bg-white p-5 shadow-lg sm:p-6 md:p-8">

            <div className="flex items-center gap-3">

              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-2xl">
                👤
              </div>

              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  View Your Wallet
                </h2>

                <p className="text-sm text-gray-500">
                  Enter your User ID to view wallet details.
                </p>
              </div>

            </div>


            {/* USER ID */}

            <div className="mt-6">

              <label className="mb-2 block text-sm font-semibold text-gray-700">
                User ID
              </label>

              <input
                type="text"
                placeholder="Example: user1"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    getWallet();
                  }
                }}
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />

            </div>


            {/* BUTTONS */}

            <div className="mt-5 flex flex-col gap-3 sm:flex-row">

              <button
                onClick={getWallet}
                disabled={loading !== ""}
                className="flex-1 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading === "wallet"
                  ? "Loading Wallet..."
                  : "View Wallet"}
              </button>

              <button
                onClick={resetWallet}
                disabled={loading !== ""}
                className="rounded-xl border border-gray-300 px-5 py-3 font-semibold text-gray-700 transition hover:bg-gray-100 disabled:opacity-50"
              >
                Reset
              </button>

            </div>

          </div>


          {/* WALLET DETAILS */}

          {wallet && (

            <div className="mt-8">

              {/* BALANCE CARDS */}

              <div className="grid gap-5 sm:grid-cols-2">

                {/* CURRENT BALANCE */}

                <div className="rounded-2xl bg-gradient-to-br from-green-500 to-green-600 p-6 text-white shadow-lg">

                  <div className="flex items-center justify-between">

                    <div>
                      <p className="text-sm text-green-100">
                        Current Balance
                      </p>

                      <p className="mt-3 text-4xl font-bold">
                        {currentBalance}
                      </p>

                      <p className="mt-1 text-sm text-green-100">
                        Available Reward Points
                      </p>
                    </div>

                    <div className="text-5xl">
                      💰
                    </div>

                  </div>

                </div>


                {/* TOTAL EARNED */}

                <div className="rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 p-6 text-white shadow-lg">

                  <div className="flex items-center justify-between">

                    <div>
                      <p className="text-sm text-blue-100">
                        Total Points Earned
                      </p>

                      <p className="mt-3 text-4xl font-bold">
                        {totalEarned}
                      </p>

                      <p className="mt-1 text-sm text-blue-100">
                        Lifetime Reward Points
                      </p>
                    </div>

                    <div className="text-5xl">
                      ⭐
                    </div>

                  </div>

                </div>

              </div>


              {/* TRANSACTION HISTORY */}

              <div className="mt-6 rounded-2xl bg-white p-5 shadow-lg sm:p-6 md:p-8">

                <div className="flex items-center gap-3">

                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-purple-100 text-xl">
                    📋
                  </div>

                  <div>
                    <h2 className="text-xl font-bold text-gray-900">
                      Transaction History
                    </h2>

                    <p className="text-sm text-gray-500">
                      View all your points activity.
                    </p>
                  </div>

                </div>


                {wallet.transactions &&
                wallet.transactions.length > 0 ? (

                  <div className="mt-6 space-y-3">

                    {wallet.transactions.map(
                      (transaction: any, index: number) => (

                        <div
                          key={index}
                          className="flex flex-col gap-3 rounded-xl border border-gray-200 p-4 transition hover:shadow-md sm:flex-row sm:items-center sm:justify-between"
                        >

                          <div className="flex items-center gap-3">

                            <div
                              className={`flex h-10 w-10 items-center justify-center rounded-full ${
                                transaction.points > 0
                                  ? "bg-green-100"
                                  : "bg-red-100"
                              }`}
                            >
                              {transaction.points > 0 ? "⬆️" : "⬇️"}
                            </div>

                            <div>

                              <p className="font-semibold text-gray-900">
                                {transaction.description}
                              </p>

                              <p className="mt-1 text-sm text-gray-500">
                                {transaction.type}
                              </p>

                            </div>

                          </div>


                          <div
                            className={`text-lg font-bold ${
                              transaction.points > 0
                                ? "text-green-600"
                                : "text-red-600"
                            }`}
                          >
                            {transaction.points > 0 ? "+" : ""}
                            {transaction.points} Points
                          </div>

                        </div>

                      )
                    )}

                  </div>

                ) : (

                  <div className="mt-6 rounded-xl bg-gray-50 p-8 text-center">

                    <div className="text-4xl">
                      📭
                    </div>

                    <p className="mt-3 font-medium text-gray-700">
                      No transactions found
                    </p>

                    <p className="mt-1 text-sm text-gray-500">
                      Your wallet transactions will appear here.
                    </p>

                  </div>

                )}

              </div>


              {/* REDEEM POINTS */}

              <div className="mt-6 rounded-2xl bg-white p-5 shadow-lg sm:p-6 md:p-8">

                <div className="flex items-center gap-3">

                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-purple-100 text-xl">
                    🎁
                  </div>

                  <div>
                    <h2 className="text-xl font-bold text-gray-900">
                      Redeem Points
                    </h2>

                    <p className="text-sm text-gray-500">
                      Use your reward points for platform discounts.
                    </p>
                  </div>

                </div>


                {/* REDEEM INPUT */}

                <div className="mt-6">

                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Points to Redeem
                  </label>

                  <input
                    type="number"
                    placeholder="Enter points to redeem"
                    value={redeemPoints}
                    min="1"
                    max={currentBalance}
                    onChange={(e) =>
                      setRedeemPoints(e.target.value)
                    }
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
                  />

                  <p className="mt-2 text-sm text-gray-500">
                    Available balance:{" "}
                    <span className="font-semibold text-green-600">
                      {currentBalance} Points
                    </span>
                  </p>

                </div>


                {/* REDEEM BUTTON */}

                <button
                  onClick={redeem}
                  disabled={
                    loading !== "" || currentBalance <= 0
                  }
                  className="mt-5 w-full rounded-xl bg-purple-600 px-5 py-3 font-semibold text-white transition hover:bg-purple-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {loading === "redeem"
                    ? "Redeeming Points..."
                    : "🎁 Redeem Points"}
                </button>


                {/* REWARD INFO */}

                <div className="mt-6 grid gap-4 sm:grid-cols-3">

                  <div className="rounded-xl bg-purple-50 p-4 text-center">

                    <div className="text-2xl">
                      ⭐
                    </div>

                    <p className="mt-2 text-sm font-semibold text-purple-700">
                      Earn Points
                    </p>

                    <p className="mt-1 text-xs text-gray-600">
                      Complete referrals
                    </p>

                  </div>


                  <div className="rounded-xl bg-blue-50 p-4 text-center">

                    <div className="text-2xl">
                      💰
                    </div>

                    <p className="mt-2 text-sm font-semibold text-blue-700">
                      Save Money
                    </p>

                    <p className="mt-1 text-xs text-gray-600">
                      Redeem for discounts
                    </p>

                  </div>


                  <div className="rounded-xl bg-green-50 p-4 text-center">

                    <div className="text-2xl">
                      🚗
                    </div>

                    <p className="mt-2 text-sm font-semibold text-green-700">
                      Car Benefits
                    </p>

                    <p className="mt-1 text-xs text-gray-600">
                      Use points on services
                    </p>

                  </div>

                </div>

              </div>

            </div>

          )}

        </div>
      </main>
    </div>
  );
}