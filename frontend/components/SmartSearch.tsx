"use client";

import { useState } from "react";

type SearchResult = {
  id: string;
  brand: string;
  model: string;
  year: number;
  price: number;
  fuelType: string;
  mileage: number;
  transmission: string;
  popularity: number;
  relevanceScore: number;
};

export default function SmartSearch() {
  // ==========================================
  // SEARCH STATES
  // ==========================================

  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);

  // ==========================================
  // FILTER STATES
  // ==========================================

  const [fuelType, setFuelType] = useState("");
  const [minYear, setMinYear] = useState("");
  const [maxYear, setMaxYear] = useState("");
  const [minMileage, setMinMileage] = useState("");
  const [maxMileage, setMaxMileage] = useState("");
  const [transmission, setTransmission] = useState("");

  // ==========================================
  // GET AUTO SUGGESTIONS
  // ==========================================

  const getSuggestions = async (value: string) => {
    setQuery(value);

    if (value.trim().length === 0) {
      setSuggestions([]);
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5133/api/search/suggestions?query=${encodeURIComponent(
          value
        )}`
      );

      const data = await response.json();

      if (response.ok) {
        setSuggestions(data.suggestions);
      }
    } catch (error) {
      console.error("Suggestion error:", error);
    }
  };

  // ==========================================
  // SEARCH CARS WITH FILTERS
  // ==========================================

  const searchCars = async (searchQuery = query) => {
    try {
      setLoading(true);

      const requestBody = {
        query: searchQuery || null,
        fuelType: fuelType || null,
        minYear: minYear ? Number(minYear) : null,
        maxYear: maxYear ? Number(maxYear) : null,
        minMileage: minMileage ? Number(minMileage) : null,
        maxMileage: maxMileage ? Number(maxMileage) : null,
        transmission: transmission || null,
      };

      const response = await fetch(
        "http://localhost:5133/api/search",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify(requestBody),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setResults(data.results);
        setSuggestions([]);
      }
    } catch (error) {
      console.error("Search error:", error);
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // SELECT SUGGESTION
  // ==========================================

  const selectSuggestion = (suggestion: string) => {
    setQuery(suggestion);
    searchCars(suggestion);
  };

  // ==========================================
  // CLEAR FILTERS
  // ==========================================

  const clearFilters = () => {
    setQuery("");
    setFuelType("");
    setMinYear("");
    setMaxYear("");
    setMinMileage("");
    setMaxMileage("");
    setTransmission("");
    setResults([]);
    setSuggestions([]);
  };

  return (
    <div className="mx-auto w-full max-w-5xl p-4">
      <h1 className="mb-6 text-center text-3xl font-bold">
        Smart Car Search
      </h1>

      {/* ========================================== */}
      {/* SEARCH INPUT */}
      {/* ========================================== */}

      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => getSuggestions(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              searchCars();
            }
          }}
          placeholder="Search cars (e.g. Creta, Swift, Cret)"
          className="w-full rounded-lg border p-4 text-lg"
        />

        {/* AUTO SUGGESTIONS */}

        {suggestions.length > 0 && (
          <div className="absolute z-10 mt-1 w-full rounded-lg border bg-white shadow-lg">
            {suggestions.map((suggestion, index) => (
              <button
                key={index}
                onClick={() => selectSuggestion(suggestion)}
                className="block w-full border-b p-3 text-left hover:bg-gray-100"
              >
                🔍 {suggestion}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* ========================================== */}
      {/* ADVANCED FILTERS */}
      {/* ========================================== */}

      <div className="mt-6 rounded-xl border bg-gray-50 p-5">
        <h2 className="mb-4 text-xl font-bold">
          Advanced Filters
        </h2>

        <div className="grid gap-4 md:grid-cols-3">

          {/* FUEL TYPE */}

          <select
            value={fuelType}
            onChange={(e) => setFuelType(e.target.value)}
            className="rounded-lg border p-3"
          >
            <option value="">All Fuel Types</option>
            <option value="Petrol">Petrol</option>
            <option value="Diesel">Diesel</option>
          </select>

          {/* MIN YEAR */}

          <input
            type="number"
            placeholder="Min Year"
            value={minYear}
            onChange={(e) => setMinYear(e.target.value)}
            className="rounded-lg border p-3"
          />

          {/* MAX YEAR */}

          <input
            type="number"
            placeholder="Max Year"
            value={maxYear}
            onChange={(e) => setMaxYear(e.target.value)}
            className="rounded-lg border p-3"
          />

          {/* MIN MILEAGE */}

          <input
            type="number"
            placeholder="Min Mileage"
            value={minMileage}
            onChange={(e) => setMinMileage(e.target.value)}
            className="rounded-lg border p-3"
          />

          {/* MAX MILEAGE */}

          <input
            type="number"
            placeholder="Max Mileage"
            value={maxMileage}
            onChange={(e) => setMaxMileage(e.target.value)}
            className="rounded-lg border p-3"
          />

          {/* TRANSMISSION */}

          <select
            value={transmission}
            onChange={(e) => setTransmission(e.target.value)}
            className="rounded-lg border p-3"
          >
            <option value="">All Transmissions</option>
            <option value="Manual">Manual</option>
            <option value="Automatic">Automatic</option>
          </select>
        </div>

        {/* FILTER BUTTONS */}

        <div className="mt-5 flex gap-3">
          <button
            onClick={() => searchCars()}
            className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white"
          >
            Apply Filters
          </button>

          <button
            onClick={clearFilters}
            className="rounded-lg bg-gray-500 px-6 py-3 font-semibold text-white"
          >
            Clear
          </button>
        </div>
      </div>

      {/* ========================================== */}
      {/* SEARCH BUTTON */}
      {/* ========================================== */}

      <button
        onClick={() => searchCars()}
        className="mt-6 rounded-lg bg-green-600 px-8 py-3 font-semibold text-white"
      >
        🔍 Search Cars
      </button>

      {/* ========================================== */}
      {/* LOADING */}
      {/* ========================================== */}

      {loading && (
        <p className="mt-6">
          Searching cars...
        </p>
      )}

      {/* ========================================== */}
      {/* SEARCH RESULTS */}
      {/* ========================================== */}

      {results.length > 0 && (
        <div className="mt-8">
          <h2 className="mb-4 text-2xl font-bold">
            Search Results ({results.length})
          </h2>

          <div className="grid gap-4 md:grid-cols-2">
            {results.map((car, index) => (
              <div
                key={car.id}
                className="relative rounded-xl border bg-white p-5 shadow"
              >
                {/* RANKING LABELS */}

                <div className="mb-3 flex flex-wrap gap-2">
                  {index === 0 && (
                    <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                      🏆 Best Match
                    </span>
                  )}

                  {car.popularity >= 90 && (
                    <span className="rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold text-orange-700">
                      🔥 Popular
                    </span>
                  )}

                  {car.relevanceScore >= 60 && (
                    <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
                      ⭐ Highly Relevant
                    </span>
                  )}
                </div>

                <h2 className="text-xl font-bold">
                  {car.brand} {car.model}
                </h2>

                <p className="mt-2">
                  Year: {car.year}
                </p>

                <p>
                  Price: ₹
                  {car.price.toLocaleString("en-IN")}
                </p>

                <p>
                  Fuel: {car.fuelType}
                </p>

                <p>
                  Mileage: {car.mileage} km/l
                </p>

                <p>
                  Transmission: {car.transmission}
                </p>

                <p className="mt-3 font-semibold text-blue-600">
                  Relevance Score:{" "}
                  {car.relevanceScore.toFixed(1)}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* NO RESULTS */}

      {!loading &&
        results.length === 0 &&
        query.length > 0 && (
          <p className="mt-6 text-gray-500">
            No results found. Try another search or change filters.
          </p>
        )}
    </div>
  );
}