"use client";

import { useState } from "react";

type WalletData = {
  userId: string;
  currentBalance: number;
  totalEarned: number;
  transactions?: WalletTransaction[];
};

type WalletTransaction = {
  description: string;
  points: number;
  type: string;
  date?: string;
};

export default function PointsWallet() {
  const [userId, setUserId] = useState("user1");

  const [wallet, setWallet] =
    useState<WalletData | null>(null);

  const [loading, setLoading] = useState(false);

  const [message, setMessage] = useState("");

  const [redeemPoints, setRedeemPoints] =
    useState("");

  const API_URL = "http://localhost:5133";

  // ==========================================
  // GET WALLET
  // ==========================================

  const getWallet = async () => {
    try {
      setLoading(true);
      setMessage("");

      const response = await fetch(
        `${API_URL}/api/wallet/${userId}`
      );

      const data = await response.json();

      if (response.ok) {
        setWallet(data);
      } else {
        setWallet(null);

        setMessage(
          data.message || "Wallet not found."
        );
      }
    } catch (error) {
      console.error(error);

      setMessage(
        "Backend connection failed."
      );
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // REDEEM POINTS
  // ==========================================

  const redeemWalletPoints = async () => {
    const points = Number(redeemPoints);

    if (!points || points <= 0) {
      setMessage(
        "Please enter valid points."
      );
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        `${API_URL}/api/wallet/redeem`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            userId: userId,
            points: points,
            description: "Platform service discount",
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setMessage(
          `Successfully redeemed ${points} points!`
        );

        setRedeemPoints("");

        // Reload wallet
        await getWallet();
      } else {
        setMessage(
          data.message ||
            "Unable to redeem points."
        );
      }
    } catch (error) {
      console.error(error);

      setMessage(
        "Backend connection failed."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-4xl px-6 py-12">

      {/* ========================================== */}
      {/* TITLE */}
      {/* ========================================== */}

      <h1 className="text-center text-3xl font-bold">
        My Points Wallet
      </h1>

      <p className="mt-2 text-center text-gray-600">
        Track your rewards and redeem points
      </p>


      {/* ========================================== */}
      {/* MESSAGE */}
      {/* ========================================== */}

      {message && (
        <div className="mx-auto mt-6 max-w-xl rounded-lg bg-blue-50 p-4 text-center text-blue-700">
          {message}
        </div>
      )}


      {/* ========================================== */}
      {/* USER ID */}
      {/* ========================================== */}

      <div className="mx-auto mt-8 flex max-w-xl gap-3">

        <input
          type="text"
          value={userId}
          onChange={(e) =>
            setUserId(e.target.value)
          }
          placeholder="Enter User ID"
          className="flex-1 rounded-lg border p-3"
        />

        <button
          onClick={getWallet}
          className="rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white"
        >
          View Wallet
        </button>

      </div>


      {/* ========================================== */}
      {/* LOADING */}
      {/* ========================================== */}

      {loading && (
        <p className="mt-8 text-center">
          Loading wallet...
        </p>
      )}


      {/* ========================================== */}
      {/* WALLET DETAILS */}
      {/* ========================================== */}

      {!loading && wallet && (

        <div className="mt-10">

          {/* WALLET CARDS */}

          <div className="grid gap-6 md:grid-cols-2">

            <div className="rounded-xl bg-green-600 p-6 text-white shadow-lg">

              <p className="text-sm">
                Current Balance
              </p>

              <h2 className="mt-2 text-4xl font-bold">
                {wallet.currentBalance}
              </h2>

              <p className="mt-2">
                Available Points
              </p>

            </div>


            <div className="rounded-xl bg-blue-600 p-6 text-white shadow-lg">

              <p className="text-sm">
                Total Points Earned
              </p>

              <h2 className="mt-2 text-4xl font-bold">
                {wallet.totalEarned}
              </h2>

              <p className="mt-2">
                Lifetime Rewards
              </p>

            </div>

          </div>


          {/* ========================================== */}
          {/* REDEEM POINTS */}
          {/* ========================================== */}

          <div className="mt-8 rounded-xl border bg-white p-6 shadow">

            <h2 className="text-xl font-bold">
              Redeem Your Points
            </h2>

            <p className="mt-2 text-gray-600">
              Use your reward points for discounts or platform services.
            </p>

            <div className="mt-5 flex gap-3">

              <input
                type="number"
                value={redeemPoints}
                onChange={(e) =>
                  setRedeemPoints(e.target.value)
                }
                placeholder="Enter points"
                className="flex-1 rounded-lg border p-3"
              />

              <button
                onClick={redeemWalletPoints}
                className="rounded-lg bg-purple-600 px-5 py-3 font-semibold text-white"
              >
                Redeem
              </button>

            </div>

          </div>


          {/* ========================================== */}
          {/* TRANSACTION HISTORY */}
          {/* ========================================== */}

          <div className="mt-8 rounded-xl border bg-white p-6 shadow">

            <h2 className="text-xl font-bold">
              Transaction History
            </h2>


            {wallet.transactions &&
              wallet.transactions.length > 0 ? (

              <div className="mt-5 space-y-3">

                {wallet.transactions.map(
                  (transaction, index) => (

                    <div
                      key={index}
                      className="flex items-center justify-between rounded-lg bg-gray-50 p-4"
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
                          transaction.points >= 0
                            ? "font-bold text-green-600"
                            : "font-bold text-red-600"
                        }
                      >

                        {transaction.points >= 0
                          ? "+"
                          : ""}

                        {transaction.points} Points

                      </div>

                    </div>

                  )
                )}

              </div>

            ) : (

              <p className="mt-5 text-gray-500">
                No transactions available.
              </p>

            )}

          </div>

        </div>

      )}

    </div>
  );
}