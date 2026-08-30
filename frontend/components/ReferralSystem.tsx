"use client";

import { useState } from "react";

type WalletTransaction = {
  type: string;
  points: number;
  description: string;
  date?: string;
};

type WalletData = {
  userId: string;
  balance: number;
  totalEarned: number;
  transactions: WalletTransaction[];
};

export default function ReferralSystem() {
  // ==========================================
  // API URL
  // ==========================================

  const API_URL = "http://localhost:5133";

  // ==========================================
  // REFERRAL STATES
  // ==========================================

  const [userId, setUserId] = useState("user1");

  const [userName, setUserName] = useState("Ranjith");

  const [referralCode, setReferralCode] = useState("");

  const [newUserId, setNewUserId] = useState("user2");

  const [codeToApply, setCodeToApply] = useState("");

  // ==========================================
  // WALLET STATES
  // ==========================================

  const [walletUserId, setWalletUserId] = useState("user1");

  const [wallet, setWallet] = useState<WalletData | null>(null);

  const [redeemPoints, setRedeemPoints] = useState("");

  // ==========================================
  // MESSAGE
  // ==========================================

  const [message, setMessage] = useState("");

  // ==========================================
  // CREATE REFERRAL CODE
  // ==========================================

  const createReferralCode = async () => {
    try {
      setMessage("Creating referral code...");

      const response = await fetch(
        `${API_URL}/api/referral/create`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            userId: userId,
            userName: userName,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setReferralCode(data.referralCode);

        setMessage(
          `Referral code created successfully: ${data.referralCode}`
        );
      } else {
        setMessage(
          data.message ||
            "Failed to create referral code."
        );
      }
    } catch (error) {
      console.error(error);

      setMessage(
        "Backend connection failed."
      );
    }
  };

  // ==========================================
  // APPLY REFERRAL CODE
  // ==========================================

  const applyReferralCode = async () => {
    try {
      if (!newUserId || !codeToApply) {
        setMessage(
          "Please enter New User ID and Referral Code."
        );
        return;
      }

      setMessage("Applying referral code...");

      const response = await fetch(
        `${API_URL}/api/referral/apply`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            newUserId: newUserId,
            referralCode: codeToApply,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setMessage(
          "Referral code applied successfully!"
        );
      } else {
        setMessage(
          data.message ||
            "Failed to apply referral code."
        );
      }
    } catch (error) {
      console.error(error);

      setMessage(
        "Backend connection failed."
      );
    }
  };

  // ==========================================
  // COMPLETE REFERRAL TRANSACTION
  // ==========================================

  const completeReferral = async () => {
    try {
      if (!userId || !newUserId) {
        setMessage(
          "Referrer ID and New User ID are required."
        );
        return;
      }

      setMessage(
        "Processing referral rewards..."
      );

      const response = await fetch(
        `${API_URL}/api/referral/complete`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            referrerId: userId,
            referredUserId: newUserId,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setMessage(
          `Rewards added successfully! Referrer: ${data.referrerReward} points, New User: ${data.referredUserReward} points`
        );
      } else {
        setMessage(
          data.message ||
            "Failed to complete referral transaction."
        );
      }
    } catch (error) {
      console.error(error);

      setMessage(
        "Backend connection failed."
      );
    }
  };

  // ==========================================
  // COPY REFERRAL CODE
  // ==========================================

  const copyReferralCode = () => {
    if (!referralCode) {
      setMessage(
        "Please generate a referral code first."
      );
      return;
    }

    navigator.clipboard.writeText(referralCode);

    setMessage(
      "Referral code copied to clipboard!"
    );
  };

  // ==========================================
  // GET WALLET
  // ==========================================

  const getWallet = async () => {
    try {
      setMessage("Loading wallet...");

      const response = await fetch(
        `${API_URL}/api/wallet/${walletUserId}`
      );

      const data = await response.json();

      if (response.ok) {
        setWallet(data);

        setMessage(
          "Wallet loaded successfully!"
        );
      } else {
        setWallet(null);

        setMessage(
          data.message ||
            "Wallet not found."
        );
      }
    } catch (error) {
      console.error(error);

      setMessage(
        "Backend connection failed."
      );
    }
  };

  // ==========================================
  // REDEEM POINTS
  // ==========================================

  const redeemWalletPoints = async () => {
    try {
      const points = Number(redeemPoints);

      if (!points || points <= 0) {
        setMessage(
          "Please enter valid points."
        );
        return;
      }

      setMessage(
        "Redeeming points..."
      );

      const response = await fetch(
        `${API_URL}/api/wallet/redeem`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            userId: walletUserId,
            points: points,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setMessage(
          `Successfully redeemed ${points} points!`
        );

        setRedeemPoints("");

        getWallet();
      } else {
        setMessage(
          data.message ||
            "Failed to redeem points."
        );
      }
    } catch (error) {
      console.error(error);

      setMessage(
        "Backend connection failed."
      );
    }
  };

  return (
    <div className="mx-auto max-w-4xl px-6 py-12">

      {/* ========================================== */}
      {/* TITLE */}
      {/* ========================================== */}

      <h1 className="text-center text-3xl font-bold">
        Referral & Rewards
      </h1>

      <p className="mt-2 text-center text-gray-600">
        Invite friends and earn reward points
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
      {/* CREATE REFERRAL CODE */}
      {/* ========================================== */}

      <div className="mt-8 rounded-xl border bg-white p-6 shadow">

        <h2 className="text-xl font-bold">
          Generate Your Referral Code
        </h2>

        <input
          type="text"
          placeholder="User ID"
          value={userId}
          onChange={(e) =>
            setUserId(e.target.value)
          }
          className="mt-4 w-full rounded-lg border p-3"
        />

        <input
          type="text"
          placeholder="Your Name"
          value={userName}
          onChange={(e) =>
            setUserName(e.target.value)
          }
          className="mt-3 w-full rounded-lg border p-3"
        />

        <button
          onClick={createReferralCode}
          className="mt-4 rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white"
        >
          Generate Referral Code
        </button>


        {referralCode && (
          <div className="mt-6 rounded-lg bg-green-50 p-5">

            <p className="text-sm text-gray-600">
              Your Referral Code
            </p>

            <h3 className="mt-2 text-2xl font-bold text-green-600">
              {referralCode}
            </h3>

            <button
              onClick={copyReferralCode}
              className="mt-3 rounded-lg bg-green-600 px-4 py-2 text-white"
            >
              Copy Code
            </button>

          </div>
        )}

      </div>


      {/* ========================================== */}
      {/* APPLY REFERRAL CODE */}
      {/* ========================================== */}

      <div className="mt-8 rounded-xl border bg-white p-6 shadow">

        <h2 className="text-xl font-bold">
          Join Using Referral Code
        </h2>

        <input
          type="text"
          placeholder="New User ID"
          value={newUserId}
          onChange={(e) =>
            setNewUserId(e.target.value)
          }
          className="mt-4 w-full rounded-lg border p-3"
        />

        <input
          type="text"
          placeholder="Enter Referral Code"
          value={codeToApply}
          onChange={(e) =>
            setCodeToApply(
              e.target.value.toUpperCase()
            )
          }
          className="mt-3 w-full rounded-lg border p-3"
        />

        <button
          onClick={applyReferralCode}
          className="mt-4 rounded-lg bg-purple-600 px-5 py-3 font-semibold text-white"
        >
          Apply Referral Code
        </button>

      </div>


      {/* ========================================== */}
      {/* COMPLETE REFERRAL */}
      {/* ========================================== */}

      <div className="mt-8 rounded-xl border bg-white p-6 shadow">

        <h2 className="text-xl font-bold">
          Complete Referral Transaction
        </h2>

        <p className="mt-2 text-gray-600">
          Simulate a successful purchase or sale.
        </p>

        <div className="mt-4 rounded-lg bg-gray-50 p-4">

          <p>
            Referrer: <b>{userId}</b>
          </p>

          <p className="mt-2">
            Referred User: <b>{newUserId}</b>
          </p>

          <p className="mt-3 text-sm text-green-600">
            Referrer Reward: 500 Points
          </p>

          <p className="text-sm text-green-600">
            New User Reward: 250 Points
          </p>

        </div>

        <button
          onClick={completeReferral}
          className="mt-4 rounded-lg bg-green-600 px-5 py-3 font-semibold text-white"
        >
          Complete Transaction & Give Rewards
        </button>

      </div>


      {/* ========================================== */}
      {/* POINTS WALLET */}
      {/* ========================================== */}

      <div className="mt-8 rounded-xl border bg-white p-6 shadow">

        <h2 className="text-xl font-bold">
          My Points Wallet
        </h2>

        <input
          type="text"
          placeholder="Enter User ID"
          value={walletUserId}
          onChange={(e) =>
            setWalletUserId(e.target.value)
          }
          className="mt-4 w-full rounded-lg border p-3"
        />

        <button
          onClick={getWallet}
          className="mt-4 rounded-lg bg-orange-500 px-5 py-3 font-semibold text-white"
        >
          View Wallet
        </button>


        {/* WALLET DETAILS */}

        {wallet && (
          <div className="mt-6">

            <div className="grid gap-4 md:grid-cols-2">

              <div className="rounded-lg bg-green-50 p-5">

                <p className="text-sm text-gray-600">
                  Current Balance
                </p>

                <h3 className="mt-2 text-3xl font-bold text-green-600">
                  {wallet.balance} Points
                </h3>

              </div>


              <div className="rounded-lg bg-blue-50 p-5">

                <p className="text-sm text-gray-600">
                  Total Points Earned
                </p>

                <h3 className="mt-2 text-3xl font-bold text-blue-600">
                  {wallet.totalEarned} Points
                </h3>

              </div>

            </div>


            {/* REDEEM POINTS */}

            <div className="mt-6 rounded-lg border p-5">

              <h3 className="font-bold">
                Redeem Points
              </h3>

              <input
                type="number"
                placeholder="Enter points to redeem"
                value={redeemPoints}
                onChange={(e) =>
                  setRedeemPoints(e.target.value)
                }
                className="mt-3 w-full rounded-lg border p-3"
              />

              <button
                onClick={redeemWalletPoints}
                className="mt-3 rounded-lg bg-red-500 px-5 py-3 font-semibold text-white"
              >
                Redeem Points
              </button>

            </div>


            {/* TRANSACTION HISTORY */}

            <div className="mt-6">

              <h3 className="text-lg font-bold">
                Transaction History
              </h3>

              {wallet.transactions &&
              wallet.transactions.length > 0 ? (

                <div className="mt-4 space-y-3">

                  {wallet.transactions.map(
                    (transaction, index) => (

                      <div
                        key={index}
                        className="flex items-center justify-between rounded-lg border p-4"
                      >

                        <div>

                          <p className="font-semibold">
                            {transaction.type}
                          </p>

                          <p className="text-sm text-gray-600">
                            {transaction.description}
                          </p>

                          {transaction.date && (
                            <p className="mt-1 text-xs text-gray-400">
                              {transaction.date}
                            </p>
                          )}

                        </div>


                        <div
                          className={`font-bold ${
                            transaction.points > 0
                              ? "text-green-600"
                              : "text-red-600"
                          }`}
                        >

                          {transaction.points > 0
                            ? "+"
                            : ""}

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

          </div>
        )}

      </div>

    </div>
  );
}