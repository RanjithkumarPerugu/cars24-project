"use client";

import Link from "next/link";
import Navbar from "@/components/Navbar";
import CarCard from "@/components/CarCard";
import SmartSearch from "@/components/SmartSearch";
import GeoCarSearch from "@/components/GeoCarSearch";
import { useState } from "react";

export default function Home() {
  const [search, setSearch] = useState("");

  const handleSearch = () => {
    if (!search.trim()) {
      alert("Please enter a car brand or model.");
      return;
    }

    window.location.href = `/cars?search=${encodeURIComponent(search)}`;
  };

  return (
    <div className="min-h-screen bg-white">
      {/* NAVBAR */}
      <Navbar />

      {/* HERO SECTION */}
      <section className="flex min-h-[500px] flex-col items-center justify-center bg-gray-100 px-4 py-12 text-center sm:px-6 md:min-h-[600px]">
        <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl md:text-5xl">
          Find Your Dream Car
        </h1>

        <p className="mt-4 max-w-2xl text-base text-gray-600 sm:text-lg md:text-xl">
          Buy certified used cars at the best price.
        </p>

        {/* SEARCH */}
        <div className="mt-8 flex w-full max-w-xl flex-col gap-3 sm:flex-row">
          <input
            type="text"
            placeholder="Search by brand or model..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearch();
              }
            }}
            className="w-full flex-1 rounded-lg border border-gray-300 px-4 py-4 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          />

          <button
            onClick={handleSearch}
            className="w-full rounded-lg bg-blue-600 px-6 py-4 font-semibold text-white transition hover:bg-blue-700 sm:w-auto"
          >
            Search
          </button>
        </div>

        {/* BROWSE CARS BUTTON */}
        <Link
          href="/cars"
          className="mt-6 rounded-lg bg-green-600 px-8 py-4 font-semibold text-white transition hover:bg-green-700"
        >
          Browse Cars
        </Link>
      </section>

      {/* SMART SEARCH SECTION */}
      <section className="bg-white px-4 py-8 sm:px-6 md:py-12">
        <SmartSearch />
      </section>

      {/* FEATURED CARS SECTION */}
      <section className="bg-white px-4 py-10 sm:px-6 md:px-8 md:py-16">
        <h2 className="mb-10 text-center text-2xl font-bold sm:text-3xl">
          Featured Cars
        </h2>

        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <CarCard
            id="creta"
            brand="Hyundai"
            model="Creta"
            year={2021}
            price="₹12 Lakh"
            image="/images/creta.jpg"
          />

          <CarCard
            id="swift"
            brand="Maruti"
            model="Swift"
            year={2022}
            price="₹7 Lakh"
            image="/images/swift.jpg"
          />

          <CarCard
            id="city"
            brand="Honda"
            model="City"
            year={2020}
            price="₹10 Lakh"
            image="/images/city.jpg"
          />
        </div>
      </section>

      {/* GEO-FENCING SECTION */}
      <section className="bg-gray-50 px-4 py-8 sm:px-6 md:py-12">
        <GeoCarSearch />
      </section>
    </div>
  );
}