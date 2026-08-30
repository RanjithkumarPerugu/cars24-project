"use client";

import { useState } from "react";

export default function ReferralSystem() {
  // ==========================================
  // USER STATES
  // ==========================================

  const [userId, setUserId] = useState("user1");
  const [userName, setUserName] = useState("Ranjith");

  const [referralCode, setReferralCode] = useState("");

  const [newUserId, setNewUserId] = useState("user2");
  const [codeToApply, setCodeToApply] = useState("");

  const [message, setMessage] = useState("");

  // Backend API URL
  const API_URL = "http://localhost:5133";

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
            userId: userId.trim(),
            userName: userName.trim(),
          }),
        }
      );

      const data = await response.json();

      console.log("Create referral response:", data);

      if (response.ok) {
        setReferralCode(data.referralCode);

        setMessage(
          `Referral code created successfully! Your code: ${data.referralCode}`
        );
      } else {
        setMessage(
          `Error: ${
            data.message || "Failed to create referral code."
          }`
        );
      }
    } catch (error) {
      console.error("Create referral error:", error);

      setMessage(
        "Backend connection failed. Check if backend is running."
      );
    }
  };

  // ==========================================
  // APPLY REFERRAL CODE
  // ==========================================

  const applyReferralCode = async () => {
    try {
      // Validation

      if (!newUserId.trim()) {
        setMessage("Please enter New User ID.");
        return;
      }

      if (!codeToApply.trim()) {
        setMessage("Please enter Referral Code.");
        return;
      }

      setMessage("Applying referral code...");

      console.log("Sending referral request:", {
        newUserId: newUserId.trim(),
        referralCode: codeToApply.trim().toUpperCase(),
      });

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

      console.log("Referral response:", data);
      console.log("Response status:", response.status);

      if (response.ok) {
        setMessage(
          `Referral code applied successfully! Referrer: ${data.referrerId}`
        );
      } else {
        setMessage(
          `Error: ${
            data.message || "Failed to apply referral code."
          }`
        );
      }
    } catch (error) {
      console.error("Apply referral error:", error);

      setMessage(
        "Backend connection failed. Check if backend is running."
      );
    }
  };

  // ==========================================
  // COMPLETE REFERRAL
  // ==========================================

  const completeReferral = async () => {
    try {
      if (!userId.trim()) {
        setMessage("Referrer User ID is required.");
        return;
      }

      if (!newUserId.trim()) {
        setMessage("Referred User ID is required.");
        return;
      }

      setMessage("Processing referral rewards...");

      console.log("Completing referral:", {
        referrerId: userId.trim(),
        referredUserId: newUserId.trim(),
      });

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

      console.log("Complete referral response:", data);

      if (response.ok) {
        setMessage(
          `Rewards added! Referrer: ${data.referrerReward} points, New User: ${data.referredUserReward} points`
        );
      } else {
        setMessage(
          `Error: ${
            data.message || "Failed to complete referral."
          }`
        );
      }
    } catch (error) {
      console.error("Complete referral error:", error);

      setMessage(
        "Backend connection failed. Check if backend is running."
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
  // PAGE UI
  // ==========================================

  return (
    <div className="mx-auto max-w-4xl px-6 py-12">

      {/* TITLE */}

      <h1 className="text-center text-3xl font-bold">
        Referral & Rewards
      </h1>

      <p className="mt-2 text-center text-gray-600">
        Invite friends and earn reward points
      </p>


      {/* MESSAGE */}

      {message && (
        <div className="mx-auto mt-6 max-w-xl rounded-lg bg-blue-50 p-4 text-center text-blue-700">
          {message}
        </div>
      )}


      {/* CREATE REFERRAL CODE */}

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


      {/* APPLY REFERRAL CODE */}

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


      {/* COMPLETE REFERRAL */}

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

    </div>
  );
}