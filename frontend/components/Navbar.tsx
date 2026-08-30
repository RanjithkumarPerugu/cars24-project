"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="flex flex-wrap items-center justify-between gap-4 bg-white px-6 py-4 shadow">

      {/* LOGO */}
      <Link
        href="/"
        className="text-2xl font-bold text-blue-700"
      >
        CarMarket
      </Link>

      {/* NAVIGATION BUTTONS */}
      <div className="flex flex-wrap items-center gap-3">

        <Link
          href="/"
          className="rounded-lg bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700"
        >
          Home
        </Link>

        <Link
          href="/cars"
          className="rounded-lg bg-red-500 px-4 py-2 font-medium text-white hover:bg-red-600"
        >
          Cars
        </Link>

        <Link
          href="/maintenance"
          className="rounded-lg bg-indigo-600 px-4 py-2 font-medium text-white hover:bg-indigo-700"
        >
          Maintenance
        </Link>

        <Link
          href="/pricing"
          className="rounded-lg bg-orange-500 px-4 py-2 font-medium text-white hover:bg-orange-600"
        >
          Dynamic Pricing
        </Link>

        <Link
          href="/referral"
          className="rounded-lg bg-purple-600 px-4 py-2 font-medium text-white hover:bg-purple-700"
        >
          Referral
        </Link>

        <Link
          href="/wallet"
          className="rounded-lg bg-green-600 px-4 py-2 font-medium text-white hover:bg-green-700"
        >
          Wallet
        </Link>

        {/* NOTIFICATIONS */}
        <Link
          href="/notifications"
          className="rounded-lg bg-yellow-500 px-4 py-2 font-medium text-white hover:bg-yellow-600"
        >
          🔔 Notifications
        </Link>

      </div>

    </nav>
  );
}