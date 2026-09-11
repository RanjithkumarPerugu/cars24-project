"use client";

import { useState } from "react";

type Car = {
  id: string;
  brand: string;
  model: string;
  year: number;
  price: number;
  fuelType: string;
  mileage: number;
  transmission: string;
  popularity: number;
  image: string;
};

const cars: Car[] = [
  {
    id: "creta-1",
    brand: "Hyundai",
    model: "Creta",
    year: 2021,
    price: 1200000,
    fuelType: "Diesel",
    mileage: 21,
    transmission: "Automatic",
    popularity: 95,
    image: "/images/creta.jpg",
  },
  {
    id: "creta-2",
    brand: "Hyundai",
    model: "Creta",
    year: 2022,
    price: 1350000,
    fuelType: "Petrol",
    mileage: 17,
    transmission: "Manual",
    popularity: 94,
    image: "/images/creta.jpg",
  },
  {
    id: "creta-3",
    brand: "Hyundai",
    model: "Creta",
    year: 2023,
    price: 1550000,
    fuelType: "Diesel",
    mileage: 20,
    transmission: "Automatic",
    popularity: 97,
    image: "/images/creta.jpg",
  },
  {
    id: "creta-4",
    brand: "Hyundai",
    model: "Creta",
    year: 2020,
    price: 1050000,
    fuelType: "Petrol",
    mileage: 16,
    transmission: "Manual",
    popularity: 91,
    image: "/images/creta.jpg",
  },
  {
    id: "creta-5",
    brand: "Hyundai",
    model: "Creta",
    year: 2019,
    price: 950000,
    fuelType: "Diesel",
    mileage: 19,
    transmission: "Manual",
    popularity: 89,
    image: "/images/creta.jpg",
  },

  {
    id: "swift-1",
    brand: "Maruti",
    model: "Swift",
    year: 2022,
    price: 800000,
    fuelType: "Petrol",
    mileage: 22,
    transmission: "Manual",
    popularity: 92,
    image: "/images/swift.jpg",
  },
  {
    id: "swift-2",
    brand: "Maruti",
    model: "Swift",
    year: 2023,
    price: 900000,
    fuelType: "Petrol",
    mileage: 23,
    transmission: "Automatic",
    popularity: 96,
    image: "/images/swift.jpg",
  },
  {
    id: "swift-3",
    brand: "Maruti",
    model: "Swift",
    year: 2021,
    price: 720000,
    fuelType: "Petrol",
    mileage: 21,
    transmission: "Manual",
    popularity: 90,
    image: "/images/swift.jpg",
  },
  {
    id: "swift-4",
    brand: "Maruti",
    model: "Swift",
    year: 2020,
    price: 650000,
    fuelType: "Diesel",
    mileage: 24,
    transmission: "Manual",
    popularity: 86,
    image: "/images/swift.jpg",
  },
  {
    id: "swift-5",
    brand: "Maruti",
    model: "Swift",
    year: 2019,
    price: 580000,
    fuelType: "Petrol",
    mileage: 20,
    transmission: "Manual",
    popularity: 84,
    image: "/images/swift.jpg",
  },

  {
    id: "city-1",
    brand: "Honda",
    model: "City",
    year: 2020,
    price: 1400000,
    fuelType: "Petrol",
    mileage: 18,
    transmission: "Automatic",
    popularity: 88,
    image: "/images/city.jpg",
  },
  {
    id: "city-2",
    brand: "Honda",
    model: "City",
    year: 2021,
    price: 1500000,
    fuelType: "Petrol",
    mileage: 19,
    transmission: "Manual",
    popularity: 91,
    image: "/images/city.jpg",
  },
  {
    id: "city-3",
    brand: "Honda",
    model: "City",
    year: 2022,
    price: 1650000,
    fuelType: "Petrol",
    mileage: 18,
    transmission: "Automatic",
    popularity: 94,
    image: "/images/city.jpg",
  },
  {
    id: "city-4",
    brand: "Honda",
    model: "City",
    year: 2019,
    price: 1100000,
    fuelType: "Diesel",
    mileage: 21,
    transmission: "Manual",
    popularity: 83,
    image: "/images/city.jpg",
  },
  {
    id: "city-5",
    brand: "Honda",
    model: "City",
    year: 2018,
    price: 950000,
    fuelType: "Petrol",
    mileage: 17,
    transmission: "Manual",
    popularity: 80,
    image: "/images/city.jpg",
  },
];

export default function SmartSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Car[]>([]);
  const [loading, setLoading] = useState(false);

  const [fuelType, setFuelType] = useState("");
  const [minYear, setMinYear] = useState("");
  const [maxYear, setMaxYear] = useState("");
  const [minMileage, setMinMileage] = useState("");
  const [maxMileage, setMaxMileage] = useState("");
  const [transmission, setTransmission] = useState("");

  // ==========================================
  // SEARCH CARS
  // ==========================================

  const searchCars = () => {
    setLoading(true);

    setTimeout(() => {
      const searchText = query.trim().toLowerCase();

      const filteredCars = cars.filter((car) => {
        const matchesSearch =
          searchText === "" ||
          car.brand.toLowerCase().includes(searchText) ||
          car.model.toLowerCase().includes(searchText) ||
          `${car.brand} ${car.model}`
            .toLowerCase()
            .includes(searchText);

        const matchesFuel =
          fuelType === "" || car.fuelType === fuelType;

        const matchesMinYear =
          minYear === "" || car.year >= Number(minYear);

        const matchesMaxYear =
          maxYear === "" || car.year <= Number(maxYear);

        const matchesMinMileage =
          minMileage === "" ||
          car.mileage >= Number(minMileage);

        const matchesMaxMileage =
          maxMileage === "" ||
          car.mileage <= Number(maxMileage);

        const matchesTransmission =
          transmission === "" ||
          car.transmission === transmission;

        return (
          matchesSearch &&
          matchesFuel &&
          matchesMinYear &&
          matchesMaxYear &&
          matchesMinMileage &&
          matchesMaxMileage &&
          matchesTransmission
        );
      });

      setResults(filteredCars);
      setLoading(false);
    }, 300);
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
  };

  return (
    <div className="mx-auto w-full max-w-5xl p-4">

      {/* TITLE */}

      <h1 className="mb-6 text-center text-3xl font-bold">
        Smart Car Search
      </h1>

      {/* SEARCH INPUT */}

      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              searchCars();
            }
          }}
          placeholder="Search cars (e.g. Creta, Swift, City)"
          className="w-full rounded-lg border p-4 text-lg outline-none focus:border-blue-500"
        />
      </div>

      {/* ADVANCED FILTERS */}

      <div className="mt-6 rounded-xl border bg-gray-50 p-5">

        <h2 className="mb-4 text-xl font-bold">
          Advanced Filters
        </h2>

        <div className="grid gap-4 md:grid-cols-3">

          {/* FUEL */}

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
            onClick={searchCars}
            className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
          >
            Apply Filters
          </button>

          <button
            onClick={clearFilters}
            className="rounded-lg bg-gray-500 px-6 py-3 font-semibold text-white hover:bg-gray-600"
          >
            Clear
          </button>

        </div>
      </div>

      {/* SEARCH BUTTON */}

      <button
        onClick={searchCars}
        className="mt-6 rounded-lg bg-green-600 px-8 py-3 font-semibold text-white hover:bg-green-700"
      >
        🔍 Search Cars
      </button>

      {/* LOADING */}

      {loading && (
        <p className="mt-6 text-gray-600">
          Searching cars...
        </p>
      )}

      {/* RESULTS */}

      {!loading && results.length > 0 && (
        <div className="mt-8">

          <h2 className="mb-4 text-2xl font-bold">
            Search Results ({results.length})
          </h2>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

            {results.map((car, index) => (
              <div
                key={car.id}
                className="overflow-hidden rounded-xl border bg-white shadow"
              >

                {/* IMAGE */}

                <img
                  src={car.image}
                  alt={`${car.brand} ${car.model}`}
                  className="h-48 w-full object-cover"
                />

                <div className="p-5">

                  {/* BADGES */}

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

                  </div>

                  <h2 className="text-xl font-bold">
                    {car.brand} {car.model}
                  </h2>

                  <p className="mt-2">
                    Year: {car.year}
                  </p>

                  <p className="font-semibold text-green-600">
                    Price: ₹{car.price.toLocaleString("en-IN")}
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

                  <p className="mt-3 text-sm font-semibold text-blue-600">
                    Popularity: {car.popularity}
                  </p>

                  <a
                    href={`/cars/${car.id}`}
                    className="mt-4 inline-block rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700"
                  >
                    View Details
                  </a>

                </div>
              </div>
            ))}

          </div>
        </div>
      )}

      {/* NO RESULTS */}

      {!loading &&
        results.length === 0 &&
        query.trim().length > 0 && (
          <p className="mt-6 text-gray-500">
            No results found. Try another search or change filters.
          </p>
        )}

    </div>
  );
}