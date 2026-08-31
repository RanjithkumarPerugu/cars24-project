"use client";

import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <nav className="relative bg-white px-4 py-4 shadow-md md:px-6">
      <div className="mx-auto flex max-w-7xl items-center justify-between">

        {/* LOGO */}
        <Link
          href="/"
          onClick={closeMenu}
          className="text-xl font-bold text-blue-700 md:text-2xl"
        >
          CarMarket
        </Link>

        {/* MOBILE MENU BUTTON */}
        <button
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          className="rounded-lg border border-gray-300 px-3 py-2 text-xl md:hidden"
          aria-label="Toggle menu"
        >
          {menuOpen ? "✕" : "☰"}
        </button>

        {/* NAVIGATION MENU */}
        <div
          className={`
            ${menuOpen ? "flex" : "hidden"}
            absolute left-0 top-full z-50 w-full flex-col gap-3
            bg-white p-4 shadow-lg
            md:static md:flex md:w-auto md:flex-row
            md:items-center md:gap-2 md:bg-transparent
            md:p-0 md:shadow-none
          `}
        >
          <Link
            href="/"
            onClick={closeMenu}
            className="rounded-lg bg-blue-600 px-4 py-2 text-center font-medium text-white hover:bg-blue-700"
          >
            Home
          </Link>

          <Link
            href="/cars"
            onClick={closeMenu}
            className="rounded-lg bg-red-500 px-4 py-2 text-center font-medium text-white hover:bg-red-600"
          >
            Cars
          </Link>

          <Link
            href="/maintenance"
            onClick={closeMenu}
            className="rounded-lg bg-indigo-600 px-4 py-2 text-center font-medium text-white hover:bg-indigo-700"
          >
            Maintenance
          </Link>

          <Link
            href="/pricing"
            onClick={closeMenu}
            className="rounded-lg bg-orange-500 px-4 py-2 text-center font-medium text-white hover:bg-orange-600"
          >
            Pricing
          </Link>

          <Link
            href="/notifications"
            onClick={closeMenu}
            className="rounded-lg bg-yellow-500 px-4 py-2 text-center font-medium text-white hover:bg-yellow-600"
          >
            Notifications
          </Link>

          <Link
            href="/referral"
            onClick={closeMenu}
            className="rounded-lg bg-purple-600 px-4 py-2 text-center font-medium text-white hover:bg-purple-700"
          >
            Referral
          </Link>

          <Link
            href="/wallet"
            onClick={closeMenu}
            className="rounded-lg bg-green-600 px-4 py-2 text-center font-medium text-white hover:bg-green-700"
          >
            Wallet
          </Link>
        </div>
      </div>
    </nav>
  );
}