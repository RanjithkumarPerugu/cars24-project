"use client";

import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";

export default function NotificationsPage() {
  const [message, setMessage] = useState("");

  const [preferences, setPreferences] = useState({
    appointment: true,
    bid: true,
    priceDrop: true,
    newMessage: true,
    browser: false,
    mobile: false,
  });

  // ==========================================
  // LOAD SAVED PREFERENCES
  // ==========================================

  useEffect(() => {
    const savedPreferences = localStorage.getItem(
      "notificationPreferences"
    );

    if (savedPreferences) {
      try {
        setPreferences(JSON.parse(savedPreferences));
      } catch (error) {
        console.error("Failed to load preferences", error);
      }
    }

    if (
      typeof window !== "undefined" &&
      "Notification" in window &&
      Notification.permission === "granted"
    ) {
      setPreferences((prev) => ({
        ...prev,
        browser: true,
      }));
    }
  }, []);

  // ==========================================
  // SHOW NOTIFICATION
  // ==========================================

  const showNotification = (
    title: string,
    body: string,
    eventType: "appointment" | "bid" | "priceDrop" | "newMessage"
  ) => {
    if (!preferences[eventType]) {
      setMessage(
        `${title} notifications are currently disabled in your preferences.`
      );
      return;
    }

    setMessage(`${title}: ${body}`);

    // Browser notification
    if (
      preferences.browser &&
      typeof window !== "undefined" &&
      "Notification" in window &&
      Notification.permission === "granted"
    ) {
      new Notification(title, {
        body: body,
        icon: "/favicon.ico",
      });
    }
  };

  // ==========================================
  // ENABLE BROWSER NOTIFICATIONS
  // ==========================================

  const enableBrowserNotifications = async () => {
    if (typeof window === "undefined") {
      return;
    }

    if (!("Notification" in window)) {
      setMessage(
        "Browser notifications are not supported in this browser."
      );
      return;
    }

    try {
      const permission = await Notification.requestPermission();

      if (permission === "granted") {
        setPreferences((prev) => ({
          ...prev,
          browser: true,
        }));

        setMessage(
          "Browser notifications enabled successfully!"
        );

        new Notification("Notifications Enabled", {
          body: "You will now receive browser notifications from CarMarket.",
          icon: "/favicon.ico",
        });
      } else {
        setPreferences((prev) => ({
          ...prev,
          browser: false,
        }));

        setMessage(
          "Browser notification permission was denied."
        );
      }
    } catch (error) {
      console.error(error);

      setMessage(
        "Unable to enable browser notifications."
      );
    }
  };

  // ==========================================
  // FIREBASE DEMO
  // ==========================================

  const enableFirebaseNotifications = () => {
    setMessage(
      "Firebase Notifications button clicked! Firebase integration is ready to be configured for production."
    );
  };

  // ==========================================
  // SAVE PREFERENCES
  // ==========================================

  const savePreferences = () => {
    try {
      localStorage.setItem(
        "notificationPreferences",
        JSON.stringify(preferences)
      );

      setMessage(
        "Notification preferences saved successfully!"
      );
    } catch (error) {
      console.error(error);

      setMessage(
        "Failed to save notification preferences."
      );
    }
  };

  // ==========================================
  // TOGGLE PREFERENCE
  // ==========================================

  const togglePreference = (
    key:
      | "appointment"
      | "bid"
      | "priceDrop"
      | "newMessage"
      | "mobile",
    value: boolean
  ) => {
    setPreferences((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

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

            <div className="mb-3 inline-block rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">
              🔔 Notification Center
            </div>

            <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              Notification Preferences
            </h1>

            <p className="mx-auto mt-3 max-w-2xl text-sm text-gray-600 sm:text-base">
              Choose which notifications you want to receive and control
              how you receive important updates.
            </p>

          </div>


          {/* MESSAGE BOX */}

          {message && (
            <div className="mx-auto mt-6 max-w-3xl rounded-xl border border-blue-200 bg-blue-50 p-4 text-center text-sm font-medium text-blue-700 sm:text-base">
              {message}
            </div>
          )}


          {/* NOTIFICATION EVENTS */}

          <div className="mt-8 rounded-2xl bg-white p-5 shadow-lg sm:p-6 md:p-8">

            <div className="flex items-center gap-3">

              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-2xl">
                ⚙️
              </div>

              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  Notification Events
                </h2>

                <p className="text-sm text-gray-500">
                  Select the events you want to receive alerts for.
                </p>
              </div>

            </div>


            <div className="mt-6 space-y-4">

              {/* APPOINTMENT */}

              <label className="flex cursor-pointer flex-col gap-4 rounded-xl border border-gray-200 p-4 transition hover:bg-gray-50 sm:flex-row sm:items-center sm:justify-between">

                <div className="flex items-center gap-3">

                  <div className="text-2xl">
                    📅
                  </div>

                  <div>
                    <p className="font-semibold text-gray-900">
                      Appointment Confirmations
                    </p>

                    <p className="text-sm text-gray-600">
                      Get notified when your appointment is confirmed.
                    </p>
                  </div>

                </div>

                <input
                  type="checkbox"
                  checked={preferences.appointment}
                  onChange={(e) =>
                    togglePreference(
                      "appointment",
                      e.target.checked
                    )
                  }
                  className="h-5 w-5 cursor-pointer accent-blue-600"
                />

              </label>


              {/* BID */}

              <label className="flex cursor-pointer flex-col gap-4 rounded-xl border border-gray-200 p-4 transition hover:bg-gray-50 sm:flex-row sm:items-center sm:justify-between">

                <div className="flex items-center gap-3">

                  <div className="text-2xl">
                    💰
                  </div>

                  <div>
                    <p className="font-semibold text-gray-900">
                      Bid Updates
                    </p>

                    <p className="text-sm text-gray-600">
                      Receive updates about your bids.
                    </p>
                  </div>

                </div>

                <input
                  type="checkbox"
                  checked={preferences.bid}
                  onChange={(e) =>
                    togglePreference(
                      "bid",
                      e.target.checked
                    )
                  }
                  className="h-5 w-5 cursor-pointer accent-purple-600"
                />

              </label>


              {/* PRICE DROP */}

              <label className="flex cursor-pointer flex-col gap-4 rounded-xl border border-gray-200 p-4 transition hover:bg-gray-50 sm:flex-row sm:items-center sm:justify-between">

                <div className="flex items-center gap-3">

                  <div className="text-2xl">
                    📉
                  </div>

                  <div>
                    <p className="font-semibold text-gray-900">
                      Price Drops
                    </p>

                    <p className="text-sm text-gray-600">
                      Get alerts when a car price drops.
                    </p>
                  </div>

                </div>

                <input
                  type="checkbox"
                  checked={preferences.priceDrop}
                  onChange={(e) =>
                    togglePreference(
                      "priceDrop",
                      e.target.checked
                    )
                  }
                  className="h-5 w-5 cursor-pointer accent-red-500"
                />

              </label>


              {/* NEW MESSAGE */}

              <label className="flex cursor-pointer flex-col gap-4 rounded-xl border border-gray-200 p-4 transition hover:bg-gray-50 sm:flex-row sm:items-center sm:justify-between">

                <div className="flex items-center gap-3">

                  <div className="text-2xl">
                    💬
                  </div>

                  <div>
                    <p className="font-semibold text-gray-900">
                      New Messages
                    </p>

                    <p className="text-sm text-gray-600">
                      Get notified when you receive a new message.
                    </p>
                  </div>

                </div>

                <input
                  type="checkbox"
                  checked={preferences.newMessage}
                  onChange={(e) =>
                    togglePreference(
                      "newMessage",
                      e.target.checked
                    )
                  }
                  className="h-5 w-5 cursor-pointer accent-green-600"
                />

              </label>

            </div>

          </div>


          {/* NOTIFICATION CHANNELS */}

          <div className="mt-6 rounded-2xl bg-white p-5 shadow-lg sm:p-6 md:p-8">

            <div className="flex items-center gap-3">

              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-100 text-2xl">
                📡
              </div>

              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  Notification Channels
                </h2>

                <p className="text-sm text-gray-500">
                  Choose how you want to receive notifications.
                </p>
              </div>

            </div>


            <div className="mt-6 grid gap-4 md:grid-cols-2">

              {/* BROWSER */}

              <div className="rounded-xl border border-gray-200 p-5">

                <div className="text-3xl">
                  🌐
                </div>

                <h3 className="mt-3 font-bold">
                  Browser Notifications
                </h3>

                <p className="mt-2 text-sm text-gray-600">
                  Receive instant notifications directly in your web browser.
                </p>

                <div className="mt-4">

                  {preferences.browser ? (

                    <div className="rounded-lg bg-green-50 p-3 text-center font-semibold text-green-700">
                      ✓ Browser Notifications Enabled
                    </div>

                  ) : (

                    <button
                      onClick={enableBrowserNotifications}
                      className="w-full rounded-xl bg-blue-600 px-4 py-3 font-semibold text-white transition hover:bg-blue-700"
                    >
                      🔔 Enable Browser Notifications
                    </button>

                  )}

                </div>

              </div>


              {/* FIREBASE */}

              <div className="rounded-xl border border-gray-200 p-5">

                <div className="text-3xl">
                  🔥
                </div>

                <h3 className="mt-3 font-bold">
                  Firebase Notifications
                </h3>

                <p className="mt-2 text-sm text-gray-600">
                  Enable Firebase Cloud Messaging for advanced push
                  notification support.
                </p>

                <button
                  onClick={enableFirebaseNotifications}
                  className="mt-4 w-full rounded-xl bg-orange-500 px-4 py-3 font-semibold text-white transition hover:bg-orange-600"
                >
                  🔥 Enable Firebase Notifications
                </button>

              </div>

            </div>

          </div>


          {/* TEST NOTIFICATIONS */}

          <div className="mt-6 rounded-2xl bg-white p-5 shadow-lg sm:p-6 md:p-8">

            <div className="flex items-center gap-3">

              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-100 text-2xl">
                🧪
              </div>

              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  Test Notifications
                </h2>

                <p className="text-sm text-gray-500">
                  Test different notification events.
                </p>
              </div>

            </div>


            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">

              {/* APPOINTMENT TEST */}

              <button
                onClick={() =>
                  showNotification(
                    "Appointment Confirmed",
                    "Your car appointment has been successfully confirmed.",
                    "appointment"
                  )
                }
                className="rounded-xl bg-green-600 px-4 py-4 font-semibold text-white transition hover:bg-green-700"
              >
                📅
                <br />
                Test Appointment
              </button>


              {/* BID TEST */}

              <button
                onClick={() =>
                  showNotification(
                    "Bid Update",
                    "Your latest bid has been updated.",
                    "bid"
                  )
                }
                className="rounded-xl bg-purple-600 px-4 py-4 font-semibold text-white transition hover:bg-purple-700"
              >
                💰
                <br />
                Test Bid Update
              </button>


              {/* PRICE DROP TEST */}

              <button
                onClick={() =>
                  showNotification(
                    "Price Drop Alert",
                    "Good news! A car you are interested in has a price drop.",
                    "priceDrop"
                  )
                }
                className="rounded-xl bg-red-500 px-4 py-4 font-semibold text-white transition hover:bg-red-600"
              >
                📉
                <br />
                Test Price Drop
              </button>


              {/* MESSAGE TEST */}

              <button
                onClick={() =>
                  showNotification(
                    "New Message",
                    "You have received a new message.",
                    "newMessage"
                  )
                }
                className="rounded-xl bg-blue-600 px-4 py-4 font-semibold text-white transition hover:bg-blue-700"
              >
                💬
                <br />
                Test New Message
              </button>

            </div>

          </div>


          {/* MOBILE NOTIFICATIONS */}

          <div className="mt-6 rounded-2xl bg-white p-5 shadow-lg sm:p-6 md:p-8">

            <div className="flex items-center gap-3">

              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-2xl">
                📱
              </div>

              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  Mobile Notifications
                </h2>

                <p className="text-sm text-gray-500">
                  Control notification preferences for mobile devices.
                </p>
              </div>

            </div>


            <label className="mt-6 flex cursor-pointer flex-col gap-4 rounded-xl bg-gray-50 p-5 sm:flex-row sm:items-center sm:justify-between">

              <div>

                <p className="font-semibold text-gray-900">
                  Enable Mobile Notifications
                </p>

                <p className="mt-1 text-sm text-gray-600">
                  Receive important updates on your mobile device.
                </p>

              </div>

              <input
                type="checkbox"
                checked={preferences.mobile}
                onChange={(e) =>
                  togglePreference(
                    "mobile",
                    e.target.checked
                  )
                }
                className="h-5 w-5 cursor-pointer accent-green-600"
              />

            </label>


            {/* SAVE BUTTON */}

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">

              <button
                onClick={savePreferences}
                className="flex-1 rounded-xl bg-green-600 px-6 py-3 font-semibold text-white transition hover:bg-green-700"
              >
                ✓ Save Preferences
              </button>

              <button
                onClick={() => setMessage("")}
                className="rounded-xl border border-gray-300 px-6 py-3 font-semibold text-gray-700 transition hover:bg-gray-100"
              >
                Clear Message
              </button>

            </div>

          </div>


          {/* INFO SECTION */}

          <div className="mt-6 grid gap-4 sm:grid-cols-3">

            <div className="rounded-xl bg-white p-5 text-center shadow">

              <div className="text-3xl">
                🔔
              </div>

              <h3 className="mt-3 font-bold">
                Stay Updated
              </h3>

              <p className="mt-2 text-sm text-gray-500">
                Never miss important car marketplace updates.
              </p>

            </div>


            <div className="rounded-xl bg-white p-5 text-center shadow">

              <div className="text-3xl">
                ⚙️
              </div>

              <h3 className="mt-3 font-bold">
                Full Control
              </h3>

              <p className="mt-2 text-sm text-gray-500">
                Choose exactly which notifications you want.
              </p>

            </div>


            <div className="rounded-xl bg-white p-5 text-center shadow">

              <div className="text-3xl">
                📱
              </div>

              <h3 className="mt-3 font-bold">
                Multi Device
              </h3>

              <p className="mt-2 text-sm text-gray-500">
                Receive alerts across browsers and mobile devices.
              </p>

            </div>

          </div>

        </div>
      </main>
    </div>
  );
}