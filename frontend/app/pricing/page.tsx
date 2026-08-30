"use client";

import { useState } from "react";

export default function DynamicPricingPage() {
  const [carName, setCarName] = useState("");
  const [basePrice, setBasePrice] = useState("");
  const [age, setAge] = useState("");
  const [mileage, setMileage] = useState("");

  const [result, setResult] = useState<number | null>(null);

  const calculatePrice = () => {
    if (!basePrice || !age || !mileage) {
      alert("Please enter all details.");
      return;
    }

    const price = Number(basePrice);
    const carAge = Number(age);
    const carMileage = Number(mileage);

    // Simple dynamic pricing calculation
    const ageDepreciation = carAge * 0.05;
    const mileageDepreciation = Math.floor(carMileage / 10000) * 0.02;

    let finalPrice =
      price - price * ageDepreciation - price * mileageDepreciation;

    if (finalPrice < price * 0.3) {
      finalPrice = price * 0.3;
    }

    setResult(Math.round(finalPrice));
  };

  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <h1 className="text-center text-3xl font-bold">
        Dynamic Car Pricing
      </h1>

      <p className="mt-2 text-center text-gray-600">
        Estimate the current price of your car
      </p>

      <div className="mt-8 rounded-xl border bg-white p-6 shadow">

        <label className="font-medium">
          Car Name
        </label>

        <input
          type="text"
          placeholder="Example: Hyundai Creta"
          value={carName}
          onChange={(e) => setCarName(e.target.value)}
          className="mt-2 w-full rounded-lg border p-3"
        />

        <label className="mt-4 block font-medium">
          Original Price (₹)
        </label>

        <input
          type="number"
          placeholder="Example: 1200000"
          value={basePrice}
          onChange={(e) => setBasePrice(e.target.value)}
          className="mt-2 w-full rounded-lg border p-3"
        />

        <label className="mt-4 block font-medium">
          Car Age (Years)
        </label>

        <input
          type="number"
          placeholder="Example: 3"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          className="mt-2 w-full rounded-lg border p-3"
        />

        <label className="mt-4 block font-medium">
          Mileage (KM)
        </label>

        <input
          type="number"
          placeholder="Example: 40000"
          value={mileage}
          onChange={(e) => setMileage(e.target.value)}
          className="mt-2 w-full rounded-lg border p-3"
        />

        <button
          onClick={calculatePrice}
          className="mt-6 w-full rounded-lg bg-orange-500 px-5 py-3 font-semibold text-white hover:bg-orange-600"
        >
          Calculate Dynamic Price
        </button>

        {result !== null && (
          <div className="mt-6 rounded-xl bg-green-50 p-6 text-center">
            <p className="text-gray-600">
              Estimated Current Price
            </p>

            <h2 className="mt-2 text-3xl font-bold text-green-600">
              ₹{result.toLocaleString("en-IN")}
            </h2>

            {carName && (
              <p className="mt-2 text-gray-700">
                Estimated value for {carName}
              </p>
            )}
          </div>
        )}

      </div>
    </div>
  );
}