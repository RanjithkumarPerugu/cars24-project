"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

// ==========================================
// DYNAMIC MAP IMPORT
// ==========================================

const NearbyMap = dynamic(
  () => import("@/components/NearbyMap"),
  {
    ssr: false,
    loading: () => (
      <p className="mt-6 text-center">
        Loading map...
      </p>
    ),
  }
);

type NearbyLocation = {
  id: number;
  name: string;
  city: string;
  type: string;
  address: string;
  latitude: number;
  longitude: number;
};

type NearbyLocationsProps = {
  city: string;
};

export default function NearbyLocations({
  city,
}: NearbyLocationsProps) {
  const [locations, setLocations] = useState<
    NearbyLocation[]
  >([]);

  const [loading, setLoading] = useState(false);

  // ==========================================
  // GET NEARBY LOCATIONS
  // ==========================================

  const getNearbyLocations = async () => {
    if (!city) return;

    try {
      setLoading(true);

      const response = await fetch(
        `http://localhost:5133/api/nearbylocations/city/${city}`
      );

      const data = await response.json();

      if (response.ok) {
        setLocations(data.locations);
      } else {
        setLocations([]);
      }
    } catch (error) {
      console.error(
        "Nearby location error:",
        error
      );

      setLocations([]);
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // LOAD LOCATIONS WHEN CITY CHANGES
  // ==========================================

  useEffect(() => {
    getNearbyLocations();
  }, [city]);

  return (
    <div className="mt-10">

      {/* ========================================== */}
      {/* TITLE */}
      {/* ========================================== */}

      <h2 className="text-center text-2xl font-bold">
        Nearby Service Centers & Pickup Points
      </h2>

      <p className="mt-2 text-center text-gray-600">
        Locations available in {city}
      </p>

      {/* ========================================== */}
      {/* LOADING */}
      {/* ========================================== */}

      {loading && (
        <p className="mt-6 text-center">
          Finding nearby locations...
        </p>
      )}

      {/* ========================================== */}
      {/* LOCATION CARDS */}
      {/* ========================================== */}

      {!loading && locations.length > 0 && (
        <>
          <div className="mt-6 grid gap-5 md:grid-cols-2">

            {locations.map((location) => (
              <div
                key={location.id}
                className="rounded-xl border bg-white p-5 shadow-md"
              >
                <h3 className="text-xl font-bold">
                  {location.name}
                </h3>

                <p className="mt-3 font-semibold text-blue-600">
                  📌 {location.type}
                </p>

                <p className="mt-2 text-gray-600">
                  📍 {location.address}
                </p>

                <p className="mt-2 text-sm text-gray-500">
                  {location.city}
                </p>

                {/* COORDINATES */}

                <p className="mt-2 text-xs text-gray-400">
                  Coordinates: {location.latitude},{" "}
                  {location.longitude}
                </p>
              </div>
            ))}

          </div>

          {/* ========================================== */}
          {/* INTERACTIVE MAP */}
          {/* ========================================== */}

          <NearbyMap
            locations={locations}
            city={city}
          />
        </>
      )}

      {/* ========================================== */}
      {/* NO LOCATIONS */}
      {/* ========================================== */}

      {!loading && locations.length === 0 && (
        <p className="mt-6 text-center text-gray-500">
          No nearby service centers or pickup points available.
        </p>
      )}

    </div>
  );
}