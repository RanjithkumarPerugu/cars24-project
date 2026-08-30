"use client";

import Link from "next/link";
import { useState } from "react";

import Navbar from "@/components/Navbar";
import CarCard from "@/components/CarCard";
import SmartSearch from "@/components/SmartSearch";
import GeoCarSearch from "@/components/GeoCarSearch";

export default function Home() {
  // Search input state
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = () => {
    const search = searchTerm.trim().toLowerCase();

    if (!search) {
      alert("Please enter a car brand or model.");
      return;
    }

    // Redirect based on search
    if (
      search.includes("creta") ||
      search.includes("hyundai")
    ) {
      window.location.href = "/cars/creta";
    } 
    else if (
      search.includes("swift") ||
      search.includes("maruti")
    ) {
      window.location.href = "/cars/swift";
    } 
    else if (
      search.includes("city") ||
      search.includes("honda")
    ) {
      window.location.href = "/cars/city";
    } 
    else {
      alert("Car not found. Try Hyundai Creta, Maruti Swift, or Honda City.");
    }
  };

  return (
    <div>
      <Navbar />

      {/* HERO SECTION */}

      <section className="flex min-h-[600px] flex-col items-center justify-center bg-gray-100 px-6 text-center">
        <h1 className="text-5xl font-bold text-gray-900">
          Find Your Dream Car
        </h1>

        <p className="mt-4 text-xl text-gray-600">
          Buy certified used cars at the best price.
        </p>

        {/* SEARCH BAR */}

        <div className="mt-8 flex w-full max-w-xl gap-2">
          <input
            type="text"
            placeholder="Search by brand or model..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearch();
              }
            }}
            className="flex-1 rounded-lg border border-gray-300 px-4 py-4"
          />

          <button
            onClick={handleSearch}
            className="rounded-lg bg-blue-600 px-6 py-4 font-semibold text-white hover:bg-blue-700"
          >
            Search
          </button>
        </div>

        {/* BROWSE ALL CARS */}

        <Link
          href="/cars"
          className="mt-6 rounded-lg bg-green-600 px-8 py-4 font-semibold text-white hover:bg-green-700"
        >
          Browse Cars
        </Link>
      </section>

      {/* SMART SEARCH SECTION */}

      <section className="bg-white px-6 py-12">
        <SmartSearch />
      </section>

      {/* FEATURED CARS SECTION */}

      <section className="bg-white px-8 py-16">
        <h2 className="mb-10 text-center text-3xl font-bold">
          Featured Cars
        </h2>

        <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-3">

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

      <section className="bg-gray-50 px-6 py-12">
        <GeoCarSearch />
      </section>
    </div>
  );
}