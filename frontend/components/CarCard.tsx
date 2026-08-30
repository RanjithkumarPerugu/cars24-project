"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type CarCardProps = {
  id: string;
  brand: string;
  model: string;
  year: number;
  price: string;
  image: string;
};

export default function CarCard({
  id,
  brand,
  model,
  year,
  price,
  image,
}: CarCardProps) {
  const router = useRouter();

  const [region, setRegion] = useState("Normal");

  const [locationStatus, setLocationStatus] =
    useState("Detecting location...");

  const [recommendedPrice, setRecommendedPrice] =
    useState<number | null>(null);

  // NEW: Pricing reasons
  const [pricingReasons, setPricingReasons] =
    useState<string[]>([]);

  const [loading, setLoading] = useState(false);

  // ==========================================
  // CONVERT PRICE STRING TO NUMBER
  // ==========================================

  const basePrice = Number(
    price.replace(/[^\d]/g, "")
  );

  // ==========================================
  // VEHICLE TYPE DETECTION
  // ==========================================

  const getVehicleType = () => {
    const carName = `${brand} ${model}`.toLowerCase();

    if (
      carName.includes("creta") ||
      carName.includes("nexon") ||
      carName.includes("venue") ||
      carName.includes("seltos") ||
      carName.includes("scorpio")
    ) {
      return "SUV";
    }

    if (
      carName.includes("thar") ||
      carName.includes("offroad")
    ) {
      return "Offroad";
    }

    return "Hatchback";
  };

  const vehicleType = getVehicleType();

  // ==========================================
  // AUTOMATIC LOCATION DETECTION
  // ==========================================

  useEffect(() => {
    if (!navigator.geolocation) {
      setLocationStatus(
        "Location detection not supported"
      );
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;

        console.log(
          "User location:",
          latitude,
          longitude
        );

        setLocationStatus("Location detected");

        // Prototype region classification
        if (latitude > 20) {
          setRegion("Metro");
        } else if (latitude > 15) {
          setRegion("Hilly");
        } else {
          setRegion("Normal");
        }
      },
      () => {
        setLocationStatus(
          "Location permission denied - select region manually"
        );
      }
    );
  }, []);

  // ==========================================
  // GET RECOMMENDED PRICE FROM BACKEND
  // ==========================================

  const getRecommendedPrice = async () => {
    try {
      setLoading(true);

      const response = await fetch(
        "http://localhost:5133/api/pricing/calculate",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            basePrice: basePrice,
            vehicleType: vehicleType,
            region: region,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        // Recommended Price
        setRecommendedPrice(
          data.recommendedPrice
        );

        // NEW: Pricing Reasons
        setPricingReasons(
          data.reasons || []
        );
      } else {
        console.error(data);
      }
    } catch (error) {
      console.error(
        "Pricing API error:",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // RECALCULATE WHEN REGION CHANGES
  // ==========================================

  useEffect(() => {
    getRecommendedPrice();
  }, [region]);

  return (
    <div className="overflow-hidden rounded-xl bg-white shadow-md">

      {/* CAR IMAGE */}

      <div className="relative h-48 w-full">
        <Image
          src={image}
          alt={`${brand} ${model}`}
          fill
          className="object-cover"
        />
      </div>

      <div className="p-6">

        {/* CAR NAME */}

        <h2 className="text-xl font-bold">
          {brand} {model}
        </h2>

        {/* MODEL YEAR */}

        <p className="mt-2 text-gray-600">
          {year} Model
        </p>

        {/* BASE PRICE */}

        <p className="mt-3 text-xl font-bold text-green-600">
          Base Price: {price}
        </p>

        {/* VEHICLE TYPE */}

        <p className="mt-2 text-sm text-gray-600">
          Vehicle Type: {vehicleType}
        </p>

        {/* REGION SELECTION */}

        <div className="mt-3">

          <label className="text-sm font-semibold">
            Select Region
          </label>

          <select
            value={region}
            onChange={(e) =>
              setRegion(e.target.value)
            }
            className="mt-1 w-full rounded-lg border p-2"
          >
            <option value="Normal">
              Normal
            </option>

            <option value="Metro">
              Metro
            </option>

            <option value="Hilly">
              Hilly
            </option>
          </select>

          {/* LOCATION STATUS */}

          <p className="mt-2 text-xs text-gray-500">
            📍 {locationStatus}
          </p>

        </div>

        {/* RECOMMENDED PRICE */}

        <div className="mt-4 rounded-lg bg-blue-50 p-3">

          <p className="text-sm font-semibold text-blue-700">
            Recommended Price
          </p>

          {loading ? (
            <p className="mt-1">
              Calculating...
            </p>
          ) : (
            <p className="mt-1 text-xl font-bold text-blue-700">
              ₹
              {recommendedPrice !== null
                ? recommendedPrice.toLocaleString("en-IN")
                : "Not available"}
            </p>
          )}

        </div>

        {/* PRICING REASONS */}

        {pricingReasons.length > 0 && (
          <div className="mt-3 rounded-lg bg-gray-50 p-3">

            <p className="text-sm font-semibold text-gray-700">
              Why this price?
            </p>

            <ul className="mt-2 list-disc pl-5 text-sm text-gray-600">
              {pricingReasons.map((reason, index) => (
                <li key={index}>
                  {reason}
                </li>
              ))}
            </ul>

          </div>
        )}

        {/* VIEW DETAILS BUTTON */}

        <button
          onClick={() =>
            router.push(`/cars/${id}`)
          }
          className="mt-4 w-full rounded-lg bg-blue-600 px-4 py-3 font-semibold text-white"
        >
          View Details
        </button>

      </div>
    </div>
  );
}