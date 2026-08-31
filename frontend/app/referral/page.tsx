"use client";

import { useState } from "react";
import Navbar from "../../components/Navbar";

export default function ReferralSystem() {
  const [userId, setUserId] = useState("user1");
  const [userName, setUserName] = useState("Ranjith");

  const [referralCode, setReferralCode] = useState("");

  const [newUserId, setNewUserId] = useState("user2");
  const [codeToApply, setCodeToApply] = useState("");

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState("");

  const API_URL = "http://localhost:5133";

  // CREATE REFERRAL CODE
  const createReferralCode = async () => {
    if (!userId.trim()) {
      setMessage("Please enter User ID.");
      return;
    }

    if (!userName.trim()) {
      setMessage("Please enter your name.");
      return;
    }

    try {
      setLoading("create");
      setMessage("Creating referral code...");

      const response = await fetch(
        `${API_URL}/api/referral/create`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: userId.trim(),
            userName: userName.trim(),
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setReferralCode(data.referralCode);

        setMessage(
          `Referral code created successfully! Your code: ${data.referralCode}`
        );
      } else {
        setMessage(
          `Error: ${data.message || "Failed to create referral code."}`
        );
      }
    } catch (error) {
      console.error("Create referral error:", error);
      setMessage(
        "Backend connection failed. Check if backend is running."
      );
    } finally {
      setLoading("");
    }
  };

  // APPLY REFERRAL CODE
  const applyReferralCode = async () => {
    if (!newUserId.trim()) {
      setMessage("Please enter New User ID.");
      return;
    }

    if (!codeToApply.trim()) {
      setMessage("Please enter Referral Code.");
      return;
    }

    try {
      setLoading("apply");
      setMessage("Applying referral code...");

      const response = await fetch(
        `${API_URL}/api/referral/apply`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            newUserId: newUserId.trim(),
            referralCode: codeToApply.trim().toUpperCase(),
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setMessage(
          `Referral code applied successfully! Referrer: ${data.referrerId}`
        );
      } else {
        setMessage(
          `Error: ${data.message || "Failed to apply referral code."}`
        );
      }
    } catch (error) {
      console.error("Apply referral error:", error);
      setMessage(
        "Backend connection failed. Check if backend is running."
      );
    } finally {
      setLoading("");
    }
  };

  // COMPLETE REFERRAL
  const completeReferral = async () => {
    if (!userId.trim()) {
      setMessage("Referrer User ID is required.");
      return;
    }

    if (!newUserId.trim()) {
      setMessage("Referred User ID is required.");
      return;
    }

    try {
      setLoading("complete");
      setMessage("Processing referral rewards...");

      const response = await fetch(
        `${API_URL}/api/referral/complete`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            referrerId: userId.trim(),
            referredUserId: newUserId.trim(),
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
          `Error: ${data.message || "Failed to complete referral."}`
        );
      }
    } catch (error) {
      console.error("Complete referral error:", error);
      setMessage(
        "Backend connection failed. Check if backend is running."
      );
    } finally {
      setLoading("");
    }
  };

  // COPY REFERRAL CODE
  const copyReferralCode = async () => {
    if (!referralCode) {
      setMessage("Please generate a referral code first.");
      return;
    }

    try {
      await navigator.clipboard.writeText(referralCode);
      setMessage("Referral code copied to clipboard!");
    } catch {
      setMessage("Unable to copy referral code.");
    }
  };

  // RESET FORM
  const resetReferral = () => {
    setUserId("user1");
    setUserName("Ranjith");
    setReferralCode("");
    setNewUserId("user2");
    setCodeToApply("");
    setMessage("");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <main className="px-4 py-8 sm:px-6 sm:py-10 lg:px-8 lg:py-12">
        <div className="mx-auto w-full max-w-6xl">

          {/* TITLE */}
          <div className="mb-8 text-center sm:mb-10">
            <div className="mb-3 inline-block rounded-full bg-purple-100 px-4 py-2 text-sm font-semibold text-purple-700">
              🎁 Referral & Rewards
            </div>

            <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl lg:text-5xl">
              Invite Friends & Earn Rewards
            </h1>

            <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-gray-600 sm:text-base">
              Generate a referral code, invite your friends, and earn reward
              points when they successfully complete a transaction.
            </p>
          </div>

          {/* MESSAGE */}
          {message && (
            <div className="mx-auto mb-6 max-w-3xl rounded-xl border border-blue-200 bg-blue-50 p-4 text-center text-sm font-medium text-blue-700 sm:text-base">
              {message}
            </div>
          )}

          {/* TOP GRID */}
          <div className="grid gap-6 lg:grid-cols-2">

            {/* CREATE REFERRAL */}
            <div className="rounded-2xl bg-white p-5 shadow-lg sm:p-6 md:p-8">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-100 text-xl">
                  🎁
                </div>

                <div>
                  <h2 className="text-xl font-bold text-gray-900">
                    Generate Your Referral Code
                  </h2>

                  <p className="text-sm text-gray-500">
                    Create a unique code to invite friends.
                  </p>
                </div>
              </div>

              <div className="mt-6">
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  User ID
                </label>

                <input
                  type="text"
                  placeholder="Enter User ID"
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none focus:border-blue-500"
                />
              </div>

              <div className="mt-4">
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Your Name
                </label>

                <input
                  type="text"
                  placeholder="Enter Your Name"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none focus:border-blue-500"
                />
              </div>

              <button
                onClick={createReferralCode}
                disabled={loading !== ""}
                className="mt-5 w-full rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
              >
                {loading === "create"
                  ? "Generating..."
                  : "Generate Referral Code"}
              </button>

              {referralCode && (
                <div className="mt-6 rounded-xl border border-green-200 bg-green-50 p-5">
                  <p className="text-sm font-medium text-gray-600">
                    Your Referral Code
                  </p>

                  <h3 className="mt-2 break-all text-2xl font-bold tracking-wider text-green-600">
                    {referralCode}
                  </h3>

                  <button
                    onClick={copyReferralCode}
                    className="mt-4 rounded-xl bg-green-600 px-4 py-3 font-semibold text-white hover:bg-green-700"
                  >
                    📋 Copy Code
                  </button>
                </div>
              )}
            </div>

            {/* APPLY REFERRAL */}
            <div className="rounded-2xl bg-white p-5 shadow-lg sm:p-6 md:p-8">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-purple-100 text-xl">
                  🤝
                </div>

                <div>
                  <h2 className="text-xl font-bold text-gray-900">
                    Join Using Referral Code
                  </h2>

                  <p className="text-sm text-gray-500">
                    Apply a friend's referral code.
                  </p>
                </div>
              </div>

              <div className="mt-6">
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  New User ID
                </label>

                <input
                  type="text"
                  placeholder="Enter New User ID"
                  value={newUserId}
                  onChange={(e) => setNewUserId(e.target.value)}
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none focus:border-purple-500"
                />
              </div>

              <div className="mt-4">
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Referral Code
                </label>

                <input
                  type="text"
                  placeholder="Enter Referral Code"
                  value={codeToApply}
                  onChange={(e) =>
                    setCodeToApply(e.target.value.toUpperCase())
                  }
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm uppercase outline-none focus:border-purple-500"
                />
              </div>

              <button
                onClick={applyReferralCode}
                disabled={loading !== ""}
                className="mt-5 w-full rounded-xl bg-purple-600 px-5 py-3 font-semibold text-white hover:bg-purple-700 disabled:opacity-50"
              >
                {loading === "apply"
                  ? "Applying..."
                  : "Apply Referral Code"}
              </button>

              <div className="mt-6 rounded-xl bg-purple-50 p-4">
                <h3 className="font-semibold text-purple-800">
                  How Referral Works
                </h3>

                <ul className="mt-3 space-y-2 text-sm text-purple-700">
                  <li>1. Generate your unique referral code.</li>
                  <li>2. Share the code with your friends.</li>
                  <li>3. Your friend registers using the code.</li>
                  <li>4. Both users earn reward points.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* COMPLETE REFERRAL */}
          <div className="mt-6 rounded-2xl bg-white p-5 shadow-lg sm:p-6 md:p-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-green-100 text-xl">
                  🏆
                </div>

                <div>
                  <h2 className="text-xl font-bold text-gray-900">
                    Complete Referral Transaction
                  </h2>

                  <p className="text-sm text-gray-500">
                    Simulate a successful purchase or sale.
                  </p>
                </div>
              </div>

              <div className="rounded-xl bg-green-50 px-4 py-3 text-center">
                <p className="text-xs text-gray-600">
                  Total Possible Rewards
                </p>

                <p className="text-lg font-bold text-green-600">
                  750 Points
                </p>
              </div>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <div className="rounded-xl bg-gray-50 p-5">
                <p className="text-sm text-gray-500">
                  Referrer
                </p>

                <p className="mt-2 break-all text-lg font-bold">
                  {userId || "Not entered"}
                </p>

                <p className="mt-3 text-sm font-medium text-green-600">
                  Reward: 500 Points
                </p>
              </div>

              <div className="rounded-xl bg-gray-50 p-5">
                <p className="text-sm text-gray-500">
                  Referred User
                </p>

                <p className="mt-2 break-all text-lg font-bold">
                  {newUserId || "Not entered"}
                </p>

                <p className="mt-3 text-sm font-medium text-green-600">
                  Reward: 250 Points
                </p>
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <button
                onClick={completeReferral}
                disabled={loading !== ""}
                className="w-full flex-1 rounded-xl bg-green-600 px-5 py-3 font-bold text-white hover:bg-green-700 disabled:opacity-50"
              >
                {loading === "complete"
                  ? "Processing Rewards..."
                  : "Complete Transaction & Give Rewards"}
              </button>

              <button
                onClick={resetReferral}
                disabled={loading !== ""}
                className="w-full rounded-xl border border-gray-300 px-5 py-3 font-semibold text-gray-700 hover:bg-gray-100 disabled:opacity-50 sm:w-auto"
              >
                Reset
              </button>
            </div>
          </div>

          {/* BENEFITS */}
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <div className="rounded-xl bg-white p-5 text-center shadow">
              <div className="text-3xl">🎁</div>
              <h3 className="mt-3 font-bold">Easy Referral</h3>
              <p className="mt-2 text-sm text-gray-500">
                Generate and share your unique referral code.
              </p>
            </div>

            <div className="rounded-xl bg-white p-5 text-center shadow">
              <div className="text-3xl">⭐</div>
              <h3 className="mt-3 font-bold">Earn Points</h3>
              <p className="mt-2 text-sm text-gray-500">
                Earn reward points when referrals are completed.
              </p>
            </div>

            <div className="rounded-xl bg-white p-5 text-center shadow">
              <div className="text-3xl">💳</div>
              <h3 className="mt-3 font-bold">Wallet Rewards</h3>
              <p className="mt-2 text-sm text-gray-500">
                View and manage earned points in your wallet.
              </p>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}