"use client";

import { useEffect, useState } from "react";
import NearbyLocations from "@/components/NearbyLocations";

type GeoCar = {
  id: string;
  brand: string;
  model: string;
  city: string;
  price: number;
};

export default function GeoCarSearch() {
  // ==========================================
  // STATES
  // ==========================================

  const [city, setCity] = useState("Hyderabad");

  const [cars, setCars] = useState<GeoCar[]>([]);

  const [loading, setLoading] = useState(false);

  const [locationStatus, setLocationStatus] = useState(
    "Detecting your location..."
  );

  // ==========================================
  // GET CARS BY CITY
  // ==========================================

  const getCarsByCity = async (selectedCity: string) => {
    try {
      setLoading(true);

      const response = await fetch(
        `http://localhost:5133/api/geocars/city/${selectedCity}`
      );

      const data = await response.json();

      if (response.ok) {
        setCars(data.cars || []);
      } else {
        setCars([]);
      }
    } catch (error) {
      console.error("Geo search error:", error);
      setCars([]);
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // AUTOMATIC LOCATION DETECTION
  // ==========================================

  const detectLocation = () => {
    console.log("DETECT LOCATION FUNCTION RUNNING");

    if (!navigator.geolocation) {
      setLocationStatus(
        "Location detection is not supported. Please select a city manually."
      );
      return;
    }

    setLocationStatus("Detecting your location...");

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        console.log("Latitude:", latitude);
        console.log("Longitude:", longitude);

        let detectedCity = "";

        // ==========================================
        // CHENNAI
        // ==========================================

        if (
          latitude >= 12.7 &&
          latitude <= 13.4 &&
          longitude >= 79.7 &&
          longitude <= 80.5
        ) {
          detectedCity = "Chennai";
        }

        // ==========================================
        // HYDERABAD
        // ==========================================

        else if (
          latitude >= 17.0 &&
          latitude <= 17.7 &&
          longitude >= 78.0 &&
          longitude <= 78.8
        ) {
          detectedCity = "Hyderabad";
        }

        // ==========================================
        // BANGALORE
        // ==========================================

        else if (
          latitude >= 12.7 &&
          latitude <= 13.3 &&
          longitude >= 77.3 &&
          longitude <= 77.9
        ) {
          detectedCity = "Bangalore";
        }

        // ==========================================
        // MUMBAI
        // ==========================================

        else if (
          latitude >= 18.7 &&
          latitude <= 19.4 &&
          longitude >= 72.6 &&
          longitude <= 73.2
        ) {
          detectedCity = "Mumbai";
        }

        // ==========================================
        // DELHI
        // ==========================================

        else if (
          latitude >= 28.3 &&
          latitude <= 28.9 &&
          longitude >= 76.8 &&
          longitude <= 77.5
        ) {
          detectedCity = "Delhi";
        }

        console.log("Detected City:", detectedCity);

        // ==========================================
        // UPDATE CITY
        // ==========================================

        if (detectedCity) {
          setCity(detectedCity);

          setLocationStatus(
            `Location detected: ${detectedCity}`
          );
        } else {
          setLocationStatus(
            `Location found (${latitude.toFixed(
              4
            )}, ${longitude.toFixed(
              4
            )}), but this city is not available in our demo list.`
          );
        }
      },

      // ==========================================
      // LOCATION ERROR
      // ==========================================

      (error) => {
        console.error("Location error:", error);

        if (error.code === 1) {
          setLocationStatus(
            "Location permission denied. Please allow location access."
          );
        } else if (error.code === 2) {
          setLocationStatus(
            "Location unavailable. Please check Windows Location Services."
          );
        } else if (error.code === 3) {
          setLocationStatus(
            "Location request timed out. Please try again."
          );
        } else {
          setLocationStatus(
            "City could not be detected. Please select manually."
          );
        }
      },

      // ==========================================
      // LOCATION SETTINGS
      // ==========================================

      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 0,
      }
    );
  };

  // ==========================================
  // DETECT LOCATION ON PAGE LOAD
  // ==========================================

  useEffect(() => {
    detectLocation();
  }, []);

  // ==========================================
  // LOAD CARS WHEN CITY CHANGES
  // ==========================================

  useEffect(() => {
    getCarsByCity(city);
  }, [city]);

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">

      {/* ========================================== */}
      {/* TITLE */}
      {/* ========================================== */}

      <h1 className="text-center text-3xl font-bold">
        Cars Near You
      </h1>

      <p className="mt-2 text-center text-gray-600">
        See cars available near your current location
      </p>

      {/* ========================================== */}
      {/* LOCATION STATUS */}
      {/* ========================================== */}

      <div className="mx-auto mt-4 max-w-md text-center">

        <p className="text-sm text-gray-600">
          📍 {locationStatus}
        </p>

        <button
          onClick={detectLocation}
          className="mt-3 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white"
        >
          Detect My Location
        </button>

      </div>

      {/* ========================================== */}
      {/* CITY SELECTOR */}
      {/* ========================================== */}

      <div className="mx-auto mt-6 max-w-md">

        <label className="mb-2 block font-semibold">
          Or Select City Manually
        </label>

        <select
          value={city}
          onChange={(e) => {
            setCity(e.target.value);

            setLocationStatus(
              `Manually selected: ${e.target.value}`
            );
          }}
          className="w-full rounded-lg border p-3"
        >
          <option value="Hyderabad">
            Hyderabad
          </option>

          <option value="Bangalore">
            Bangalore
          </option>

          <option value="Chennai">
            Chennai
          </option>

          <option value="Mumbai">
            Mumbai
          </option>

          <option value="Delhi">
            Delhi
          </option>

        </select>

      </div>

      {/* ========================================== */}
      {/* LOADING */}
      {/* ========================================== */}

      {loading && (
        <p className="mt-8 text-center">
          Finding cars near you...
        </p>
      )}

      {/* ========================================== */}
      {/* CARS */}
      {/* ========================================== */}

      {!loading && cars.length > 0 && (

        <div className="mt-8 grid gap-6 md:grid-cols-3">

          {cars.map((car) => (

            <div
              key={car.id}
              className="rounded-xl border bg-white p-5 shadow-md"
            >

              <h2 className="text-xl font-bold">
                {car.brand} {car.model}
              </h2>

              <p className="mt-3 text-gray-600">
                📍 {car.city}
              </p>

              <p className="mt-3 text-lg font-bold text-green-600">
                ₹{car.price.toLocaleString("en-IN")}
              </p>

              <p className="mt-3 text-sm text-blue-600">
                Available in your selected city
              </p>

            </div>

          ))}

        </div>

      )}

      {/* ========================================== */}
      {/* NO CARS */}
      {/* ========================================== */}

      {!loading && cars.length === 0 && (

        <p className="mt-8 text-center text-gray-500">
          No cars available in this city.
        </p>

      )}

      {/* ========================================== */}
      {/* NEARBY SERVICE CENTERS & PICKUP POINTS */}
      {/* ========================================== */}

      <NearbyLocations city={city} />

    </div>
  );
}