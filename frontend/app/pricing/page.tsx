"use client";

import { useState } from "react";
import Navbar from "../../components/Navbar";

export default function DynamicPricingPage() {
  const [carName, setCarName] = useState("");
  const [basePrice, setBasePrice] = useState("");
  const [age, setAge] = useState("");
  const [mileage, setMileage] = useState("");

  const [result, setResult] = useState<number | null>(null);

  const calculatePrice = () => {
    if (!carName || !basePrice || !age || !mileage) {
      alert("Please enter all details.");
      return;
    }

    const price = Number(basePrice);
    const carAge = Number(age);
    const carMileage = Number(mileage);

    if (price <= 0) {
      alert("Original price must be greater than 0.");
      return;
    }

    if (carAge < 0) {
      alert("Car age cannot be negative.");
      return;
    }

    if (carMileage < 0) {
      alert("Mileage cannot be negative.");
      return;
    }

    // Simple dynamic pricing calculation
    const ageDepreciation = carAge * 0.05;
    const mileageDepreciation =
      Math.floor(carMileage / 10000) * 0.02;

    let finalPrice =
      price -
      price * ageDepreciation -
      price * mileageDepreciation;

    // Minimum price should be 30% of original price
    if (finalPrice < price * 0.3) {
      finalPrice = price * 0.3;
    }

    setResult(Math.round(finalPrice));

    // Scroll to result
    setTimeout(() => {
      document
        .getElementById("pricing-result")
        ?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
    }, 100);
  };

  const resetForm = () => {
    setCarName("");
    setBasePrice("");
    setAge("");
    setMileage("");
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <main className="px-4 py-8 sm:px-6 sm:py-10 lg:px-8 lg:py-12">
        <div className="mx-auto w-full max-w-6xl">

          {/* HEADER */}
          <div className="mb-8 text-center sm:mb-10">
            <div className="mb-3 inline-block rounded-full bg-orange-100 px-4 py-2 text-sm font-semibold text-orange-700">
              💰 Smart Dynamic Pricing
            </div>

            <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl lg:text-5xl">
              Dynamic Car Pricing
            </h1>

            <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-gray-600 sm:text-base">
              Estimate the current market value of your car based on
              original price, vehicle age, and mileage.
            </p>
          </div>

          {/* MAIN CONTENT */}
          <div className="grid gap-6 lg:grid-cols-3">

            {/* FORM CARD */}
            <div className="rounded-2xl bg-white p-4 shadow-lg sm:p-6 md:p-8 lg:col-span-2">

              <h2 className="text-xl font-bold text-gray-900 sm:text-2xl">
                Enter Car Details
              </h2>

              <p className="mt-2 text-sm text-gray-500">
                Enter your vehicle information to calculate the estimated
                current price.
              </p>

              {/* FORM */}
              <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">

                {/* CAR NAME */}
                <div className="sm:col-span-2">
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Car Name
                  </label>

                  <input
                    type="text"
                    placeholder="Example: Hyundai Creta"
                    value={carName}
                    onChange={(e) => {
                      setCarName(e.target.value);
                      setResult(null);
                    }}
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
                  />
                </div>

                {/* ORIGINAL PRICE */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Original Price (₹)
                  </label>

                  <input
                    type="number"
                    placeholder="Example: 1200000"
                    value={basePrice}
                    onChange={(e) => {
                      setBasePrice(e.target.value);
                      setResult(null);
                    }}
                    min="0"
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
                  />
                </div>

                {/* CAR AGE */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Car Age (Years)
                  </label>

                  <input
                    type="number"
                    placeholder="Example: 3"
                    value={age}
                    onChange={(e) => {
                      setAge(e.target.value);
                      setResult(null);
                    }}
                    min="0"
                    max="30"
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
                  />
                </div>

                {/* MILEAGE */}
                <div className="sm:col-span-2">
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Mileage (KM)
                  </label>

                  <input
                    type="number"
                    placeholder="Example: 40000"
                    value={mileage}
                    onChange={(e) => {
                      setMileage(e.target.value);
                      setResult(null);
                    }}
                    min="0"
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
                  />
                </div>

              </div>

              {/* BUTTONS */}
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">

                <button
                  onClick={calculatePrice}
                  className="w-full flex-1 rounded-xl bg-orange-500 px-5 py-3 font-bold text-white transition hover:bg-orange-600 active:scale-[0.98]"
                >
                  Calculate Dynamic Price
                </button>

                <button
                  onClick={resetForm}
                  className="w-full rounded-xl border border-gray-300 px-5 py-3 font-semibold text-gray-700 transition hover:bg-gray-100 sm:w-auto"
                >
                  Reset
                </button>

              </div>
            </div>

            {/* INFORMATION CARD */}
            <div className="rounded-2xl bg-white p-5 shadow-lg sm:p-6 lg:p-7">

              <h2 className="text-xl font-bold text-gray-900">
                How It Works
              </h2>

              <div className="mt-6 space-y-5">

                <div className="flex gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-orange-100 text-lg">
                    💰
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-900">
                      Original Price
                    </h3>

                    <p className="mt-1 text-sm leading-5 text-gray-500">
                      The starting value of the vehicle when it was purchased.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-100 text-lg">
                    📅
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-900">
                      Age Depreciation
                    </h3>

                    <p className="mt-1 text-sm leading-5 text-gray-500">
                      Vehicle value decreases based on the age of the car.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-green-100 text-lg">
                    🛣️
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-900">
                      Mileage Impact
                    </h3>

                    <p className="mt-1 text-sm leading-5 text-gray-500">
                      Higher mileage may reduce the estimated market value.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-purple-100 text-lg">
                    📊
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-900">
                      Smart Estimate
                    </h3>

                    <p className="mt-1 text-sm leading-5 text-gray-500">
                      Get an estimated current price based on vehicle details.
                    </p>
                  </div>
                </div>

              </div>

              {/* PRICING FORMULA */}
              <div className="mt-7 rounded-xl bg-orange-50 p-4">
                <h3 className="font-semibold text-orange-800">
                  Pricing Logic
                </h3>

                <p className="mt-2 text-xs leading-5 text-orange-700">
                  The estimated price considers approximately 5% depreciation
                  per year and an additional reduction based on every
                  10,000 kilometers driven.
                </p>
              </div>

            </div>
          </div>

          {/* RESULT SECTION */}
          {result !== null && (
            <div
              id="pricing-result"
              className="mt-6 rounded-2xl bg-white p-4 shadow-lg sm:p-6 md:p-8"
            >

              {/* RESULT HEADER */}
              <div className="flex flex-col gap-3 border-b pb-5 sm:flex-row sm:items-center sm:justify-between">

                <div>
                  <p className="text-sm text-gray-500">
                    Dynamic Price Analysis
                  </p>

                  <h2 className="mt-1 text-2xl font-bold text-gray-900 sm:text-3xl">
                    Estimated Current Value
                  </h2>
                </div>

                <span className="w-fit rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-700">
                  Price Calculated
                </span>

              </div>

              {/* RESULT CARDS */}
              <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">

                {/* ESTIMATED PRICE */}
                <div className="rounded-xl bg-green-50 p-5">
                  <p className="text-sm text-gray-600">
                    Recommended Price
                  </p>

                  <p className="mt-2 break-words text-2xl font-bold text-green-600 sm:text-3xl">
                    ₹{result.toLocaleString("en-IN")}
                  </p>
                </div>

                {/* ORIGINAL PRICE */}
                <div className="rounded-xl bg-blue-50 p-5">
                  <p className="text-sm text-gray-600">
                    Original Price
                  </p>

                  <p className="mt-2 break-words text-2xl font-bold text-blue-600 sm:text-3xl">
                    ₹{Number(basePrice).toLocaleString("en-IN")}
                  </p>
                </div>

                {/* CAR DETAILS */}
                <div className="rounded-xl bg-purple-50 p-5">
                  <p className="text-sm text-gray-600">
                    Vehicle Details
                  </p>

                  <p className="mt-2 text-lg font-bold text-purple-600 sm:text-xl">
                    {carName}
                  </p>

                  <p className="mt-2 text-xs text-gray-500">
                    {age} years old •{" "}
                    {Number(mileage).toLocaleString("en-IN")} KM driven
                  </p>
                </div>

              </div>

              {/* SAVINGS / DEPRECIATION */}
              <div className="mt-6 rounded-xl border border-orange-200 bg-orange-50 p-4 sm:p-5">

                <h3 className="text-lg font-bold text-orange-800">
                  Price Difference
                </h3>

                <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">

                  <p className="text-sm text-orange-700">
                    Estimated depreciation from the original price
                  </p>

                  <p className="text-xl font-bold text-orange-700">
                    ₹
                    {(
                      Number(basePrice) - result
                    ).toLocaleString("en-IN")}
                  </p>

                </div>
              </div>

              {/* NOTE */}
              <div className="mt-6 rounded-xl border border-yellow-200 bg-yellow-50 p-4">
                <p className="text-xs leading-5 text-yellow-800">
                  <strong>Note:</strong> This is an estimated dynamic price.
                  Actual market value may vary depending on vehicle condition,
                  demand, location, seasonal trends, accident history, and
                  other market factors.
                </p>
              </div>

            </div>
          )}

        </div>
      </main>
    </div>
  );
}