"use client";

import { useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function TestDrivePage() {
  const searchParams = useSearchParams();

  const car = searchParams.get("car") || "Selected Car";

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const [message, setMessage] = useState("");

  const bookTestDrive = () => {
    if (!name || !phone || !date) {
      setMessage("Please fill all details.");
      return;
    }

    if (phone.length < 10) {
      setMessage("Please enter a valid phone number.");
      return;
    }

    setMessage(
      `Test drive booked successfully for ${car}! We will contact you soon.`
    );
  };

  return (
    <div className="mx-auto max-w-2xl px-6 py-12">
      <Link
        href="/cars"
        className="text-blue-600 hover:underline"
      >
        ← Back to Cars
      </Link>

      <div className="mt-6 rounded-xl border bg-white p-8 shadow">
        <h1 className="text-3xl font-bold">
          Book a Test Drive
        </h1>

        <p className="mt-3 text-gray-600">
          Book a test drive for:
          <span className="ml-2 font-bold text-blue-600">
            {car.toUpperCase()}
          </span>
        </p>

        {message && (
          <div
            className={`mt-5 rounded-lg p-4 text-center ${
              message.includes("successfully")
                ? "bg-green-50 text-green-700"
                : "bg-red-50 text-red-700"
            }`}
          >
            {message}
          </div>
        )}

        <div className="mt-6">
          <label className="font-medium">
            Full Name
          </label>

          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-2 w-full rounded-lg border p-3"
          />
        </div>

        <div className="mt-5">
          <label className="font-medium">
            Phone Number
          </label>

          <input
            type="tel"
            placeholder="Enter your phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="mt-2 w-full rounded-lg border p-3"
          />
        </div>

        <div className="mt-5">
          <label className="font-medium">
            Preferred Date
          </label>

          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="mt-2 w-full rounded-lg border p-3"
          />
        </div>

        <button
          onClick={bookTestDrive}
          className="mt-6 w-full rounded-lg bg-green-600 px-6 py-3 font-semibold text-white hover:bg-green-700"
        >
          Confirm Test Drive
        </button>
      </div>
    </div>
  );
}