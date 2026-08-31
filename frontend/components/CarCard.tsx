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

  const [pricingReasons, setPricingReasons] =
    useState<string[]>([]);

  const convertPriceToNumber = (priceValue: string) => {
    const numericValue = Number(
      priceValue.replace(/[^\d.]/g, "")
    );

    if (priceValue.toLowerCase().includes("lakh")) {
      return numericValue * 100000;
    }

    if (priceValue.toLowerCase().includes("crore")) {
      return numericValue * 10000000;
    }

    return numericValue;
  };

  const basePrice = convertPriceToNumber(price);

  const getVehicleType = () => {
    const carName = `${brand} ${model}`.toLowerCase();

    if (
      carName.includes("creta") ||
      carName.includes("nexon") ||
      carName.includes("venue") ||
      carName.includes("seltos") ||
      carName.includes("scorpio") ||
      carName.includes("xuv")
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

  // AUTOMATIC LOCATION DETECTION

  useEffect(() => {
    if (!navigator.geolocation) {
      setLocationStatus(
        "Location detection is not supported"
      );
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude } = position.coords;

        let detectedRegion = "Normal";

        if (latitude > 20) {
          detectedRegion = "Metro";
        } else if (latitude > 15) {
          detectedRegion = "Hilly";
        }

        setRegion(detectedRegion);

        setLocationStatus(
          `Location detected successfully - ${detectedRegion} region`
        );
      },

      () => {
        setLocationStatus(
          "Location permission denied - select region manually"
        );
      }
    );
  }, []);

  // CALCULATE RECOMMENDED PRICE

  useEffect(() => {
    let multiplier = 1;
    let reasons: string[] = [];

    if (region === "Metro") {
      multiplier = 1.08;

      reasons = [
        "Higher demand in metropolitan areas",
        "Better resale value",
        "Higher operating and service costs",
      ];
    } else if (region === "Hilly") {
      multiplier = 1.05;

      reasons = [
        "Suitable pricing for difficult terrain",
        "Higher demand for durable vehicles",
        "Additional transportation costs",
      ];
    } else {
      multiplier = 1.03;

      reasons = [
        "Standard market demand",
        "Normal transportation costs",
        "Balanced regional pricing",
      ];
    }

    if (vehicleType === "SUV") {
      multiplier += 0.02;

      reasons.push("SUV market demand adjustment");
    }

    if (vehicleType === "Offroad") {
      multiplier += 0.03;

      reasons.push("Off-road vehicle demand adjustment");
    }

    const calculatedPrice = Math.round(
      basePrice * multiplier
    );

    setRecommendedPrice(calculatedPrice);
    setPricingReasons(reasons);
  }, [region, basePrice, vehicleType]);

  return (
    <div className="overflow-hidden rounded-xl bg-white shadow-md transition hover:shadow-xl">

      {/* CAR IMAGE */}

      <div className="relative h-48 w-full">
        <Image
          src={image}
          alt={`${brand} ${model}`}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
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

        <div className="mt-4">

          <label className="text-sm font-semibold">
            Select Region
          </label>

          <select
            value={region}
            onChange={(e) =>
              setRegion(e.target.value)
            }
            className="mt-2 w-full rounded-lg border border-gray-300 p-2"
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

          <p className="mt-2 text-xs text-gray-500">
            📍 {locationStatus}
          </p>

        </div>

        {/* RECOMMENDED PRICE */}

        <div className="mt-4 rounded-lg bg-blue-50 p-4">

          <p className="text-sm font-semibold text-blue-700">
            Recommended Price
          </p>

          {recommendedPrice !== null ? (
            <p className="mt-2 text-xl font-bold text-blue-700">
              ₹{recommendedPrice.toLocaleString("en-IN")}
            </p>
          ) : (
            <p className="mt-2 text-sm text-gray-600">
              Calculating price...
            </p>
          )}

        </div>

        {/* PRICING REASONS */}

        {pricingReasons.length > 0 && (
          <div className="mt-3 rounded-lg bg-gray-50 p-3">

            <p className="text-sm font-semibold text-gray-700">
              Why this price?
            </p>

            <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-gray-600">

              {pricingReasons.map(
                (reason, index) => (
                  <li key={index}>
                    {reason}
                  </li>
                )
              )}

            </ul>

          </div>
        )}

        {/* VIEW DETAILS BUTTON */}

        <button
          onClick={() =>
            router.push(`/cars/${id}`)
          }
          className="mt-5 w-full rounded-lg bg-blue-600 px-4 py-3 font-semibold text-white transition hover:bg-blue-700"
        >
          View Details
        </button>

      </div>
    </div>
  );
}