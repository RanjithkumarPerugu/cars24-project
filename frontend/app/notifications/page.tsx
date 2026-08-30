"use client";

import { useState } from "react";

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

  // Show notification
  const showNotification = (title: string, body: string) => {
    setMessage(`${title}: ${body}`);

    // Browser notification
    if (
      preferences.browser &&
      typeof window !== "undefined" &&
      Notification.permission === "granted"
    ) {
      new Notification(title, {
        body: body,
      });
    }
  };

  // Enable browser notifications
  const enableBrowserNotifications = async () => {
    if (!("Notification" in window)) {
      setMessage("Browser notifications are not supported.");
      return;
    }

    const permission = await Notification.requestPermission();

    if (permission === "granted") {
      setPreferences((prev) => ({
        ...prev,
        browser: true,
      }));

      setMessage("Browser notifications enabled successfully!");
    } else {
      setMessage("Browser notification permission was denied.");
    }
  };

  // Firebase demo
  const enableFirebaseNotifications = () => {
    setMessage(
      "Firebase Notifications button clicked! Firebase integration can be configured for production."
    );
  };

  // Save preferences
  const savePreferences = () => {
    localStorage.setItem(
      "notificationPreferences",
      JSON.stringify(preferences)
    );

    setMessage("Notification preferences saved successfully!");
  };

  return (
    <div className="mx-auto max-w-4xl px-6 py-12">

      <h1 className="text-3xl font-bold">
        Notification Preferences
      </h1>

      <p className="mt-2 text-gray-600">
        Choose which notifications you want to receive.
      </p>

      {/* MESSAGE BOX */}

      {message && (
        <div className="mt-6 rounded-lg bg-blue-50 p-4 font-medium text-blue-700">
          {message}
        </div>
      )}

      {/* NOTIFICATION PREFERENCES */}

      <div className="mt-8 rounded-xl border bg-white p-6 shadow">

        <h2 className="text-xl font-bold">
          Notification Events
        </h2>

        <div className="mt-5 space-y-5">

          <label className="flex cursor-pointer items-center justify-between">
            <div>
              <p className="font-semibold">
                Appointment Confirmations
              </p>

              <p className="text-sm text-gray-600">
                Get notified when your appointment is confirmed.
              </p>
            </div>

            <input
              type="checkbox"
              checked={preferences.appointment}
              onChange={(e) =>
                setPreferences({
                  ...preferences,
                  appointment: e.target.checked,
                })
              }
              className="h-5 w-5"
            />
          </label>

          <label className="flex cursor-pointer items-center justify-between">
            <div>
              <p className="font-semibold">
                Bid Updates
              </p>

              <p className="text-sm text-gray-600">
                Receive updates about your bids.
              </p>
            </div>

            <input
              type="checkbox"
              checked={preferences.bid}
              onChange={(e) =>
                setPreferences({
                  ...preferences,
                  bid: e.target.checked,
                })
              }
              className="h-5 w-5"
            />
          </label>

          <label className="flex cursor-pointer items-center justify-between">
            <div>
              <p className="font-semibold">
                Price Drops
              </p>

              <p className="text-sm text-gray-600">
                Get alerts when a car price drops.
              </p>
            </div>

            <input
              type="checkbox"
              checked={preferences.priceDrop}
              onChange={(e) =>
                setPreferences({
                  ...preferences,
                  priceDrop: e.target.checked,
                })
              }
              className="h-5 w-5"
            />
          </label>

          <label className="flex cursor-pointer items-center justify-between">
            <div>
              <p className="font-semibold">
                New Messages
              </p>

              <p className="text-sm text-gray-600">
                Get notified when you receive a new message.
              </p>
            </div>

            <input
              type="checkbox"
              checked={preferences.newMessage}
              onChange={(e) =>
                setPreferences({
                  ...preferences,
                  newMessage: e.target.checked,
                })
              }
              className="h-5 w-5"
            />
          </label>

        </div>
      </div>

      {/* NOTIFICATION CHANNELS */}

      <div className="mt-8 rounded-xl border bg-white p-6 shadow">

        <h2 className="text-xl font-bold">
          Notification Channels
        </h2>

        <div className="mt-5 space-y-4">

          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold">
                Browser Notifications
              </p>

              <p className="text-sm text-gray-600">
                Receive notifications in your web browser.
              </p>
            </div>

            <button
              onClick={enableBrowserNotifications}
              className="rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700"
            >
              🔔 Enable Browser Notifications
            </button>
          </div>

          <button
            onClick={enableFirebaseNotifications}
            className="rounded-lg bg-orange-500 px-4 py-2 font-semibold text-white hover:bg-orange-600"
          >
            🔥 Enable Firebase Notifications
          </button>

        </div>
      </div>

      {/* TEST NOTIFICATIONS */}

      <div className="mt-8 rounded-xl border bg-white p-6 shadow">

        <h2 className="text-xl font-bold">
          Test Notifications
        </h2>

        <p className="mt-2 text-gray-600">
          Click a button to test different notification events.
        </p>

        <div className="mt-5 flex flex-wrap gap-3">

          <button
            onClick={() =>
              showNotification(
                "Appointment Confirmed",
                "Your car appointment has been successfully confirmed."
              )
            }
            className="rounded-lg bg-green-600 px-4 py-3 font-semibold text-white hover:bg-green-700"
          >
            Test Appointment
          </button>

          <button
            onClick={() =>
              showNotification(
                "Bid Update",
                "Your latest bid has been updated."
              )
            }
            className="rounded-lg bg-purple-600 px-4 py-3 font-semibold text-white hover:bg-purple-700"
          >
            Test Bid Update
          </button>

          <button
            onClick={() =>
              showNotification(
                "Price Drop Alert",
                "Good news! A car you are interested in has a price drop."
              )
            }
            className="rounded-lg bg-red-500 px-4 py-3 font-semibold text-white hover:bg-red-600"
          >
            Test Price Drop
          </button>

          <button
            onClick={() =>
              showNotification(
                "New Message",
                "You have received a new message."
              )
            }
            className="rounded-lg bg-blue-600 px-4 py-3 font-semibold text-white hover:bg-blue-700"
          >
            Test New Message
          </button>

        </div>
      </div>

      {/* MOBILE NOTIFICATIONS */}

      <div className="mt-8 rounded-xl border bg-white p-6 shadow">

        <h2 className="text-xl font-bold">
          Mobile Notifications
        </h2>

        <label className="mt-4 flex items-center gap-3">
          <input
            type="checkbox"
            checked={preferences.mobile}
            onChange={(e) =>
              setPreferences({
                ...preferences,
                mobile: e.target.checked,
              })
            }
            className="h-5 w-5"
          />

          <div>
            <p className="font-semibold">
              Mobile Notifications
            </p>

            <p className="text-sm text-gray-600">
              Receive notifications on your mobile device.
            </p>
          </div>
        </label>

        <button
          onClick={savePreferences}
          className="mt-6 rounded-lg bg-green-600 px-6 py-3 font-semibold text-white hover:bg-green-700"
        >
          Save Preferences
        </button>

      </div>

    </div>
  );
}