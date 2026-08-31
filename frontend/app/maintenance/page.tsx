"use client";

import { useState } from "react";
import Navbar from "../../components/Navbar";

const carModels: Record<string, string[]> = {
  Hyundai: ["Creta", "Venue", "i20"],
  Maruti: ["Swift", "Baleno", "Brezza"],
  Honda: ["City", "Amaze"],
  Tata: ["Nexon", "Punch", "Altroz"],
  Mahindra: ["XUV700", "Scorpio"],
};

type MaintenanceResult = {
  status: string;
  estimatedMonthlyCost: number;
  nextServiceDueInKm: number;
  insights: string[];
};

export default function MaintenancePage() {
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [age, setAge] = useState("");
  const [kilometers, setKilometers] = useState("");
  const [lastServiceKm, setLastServiceKm] = useState("");

  const [result, setResult] = useState<MaintenanceResult | null>(null);
  const [loading, setLoading] = useState(false);

  const calculateMaintenance = async () => {
    // Validation
    if (!brand || !model || !age || !kilometers || !lastServiceKm) {
      alert("Please fill in all details");
      return;
    }

    if (Number(age) < 0) {
      alert("Car age cannot be negative");
      return;
    }

    if (Number(kilometers) < 0) {
      alert("Kilometers cannot be negative");
      return;
    }

    if (Number(lastServiceKm) < 0) {
      alert("Last service kilometer cannot be negative");
      return;
    }

    if (Number(lastServiceKm) > Number(kilometers)) {
      alert(
        "Last service kilometer cannot be greater than current kilometers"
      );
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      const response = await fetch(
        "http://localhost:5133/api/maintenance/calculate",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            brand: brand,
            model: model,
            age: Number(age),
            kilometers: Number(kilometers),
            lastServiceKm: Number(lastServiceKm),
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to calculate maintenance");
      }

      const data: MaintenanceResult = await response.json();

      setResult(data);

      // Scroll to result on mobile
      setTimeout(() => {
        document
          .getElementById("maintenance-result")
          ?.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
      }, 100);
    } catch (error) {
      console.error(error);

      alert(
        "Unable to connect to backend. Check that dotnet run is running."
      );
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setBrand("");
    setModel("");
    setAge("");
    setKilometers("");
    setLastServiceKm("");
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <main className="px-4 py-8 sm:px-6 sm:py-10 lg:px-8 lg:py-12">
        <div className="mx-auto w-full max-w-6xl">

          {/* HEADER */}
          <div className="mb-8 text-center sm:mb-10">
            <div className="mb-3 inline-block rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">
              🚗 Smart Car Maintenance
            </div>

            <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl lg:text-5xl">
              Vehicle Maintenance Cost Estimator
            </h1>

            <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-gray-600 sm:text-base">
              Estimate maintenance costs and predict upcoming service needs
              based on your vehicle details.
            </p>
          </div>

          {/* MAIN GRID */}
          <div className="grid gap-6 lg:grid-cols-3">

            {/* FORM CARD */}
            <div className="rounded-2xl bg-white p-4 shadow-lg sm:p-6 md:p-8 lg:col-span-2">

              <h2 className="text-xl font-bold text-gray-900 sm:text-2xl">
                Enter Vehicle Details
              </h2>

              <p className="mt-2 text-sm text-gray-500">
                Provide accurate information to get a better maintenance estimate.
              </p>

              {/* FORM */}
              <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">

                {/* BRAND */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Car Brand
                  </label>

                  <select
                    value={brand}
                    onChange={(e) => {
                      setBrand(e.target.value);
                      setModel("");
                      setResult(null);
                    }}
                    className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  >
                    <option value="">Select Car Brand</option>
                    <option value="Hyundai">Hyundai</option>
                    <option value="Maruti">Maruti</option>
                    <option value="Honda">Honda</option>
                    <option value="Tata">Tata</option>
                    <option value="Mahindra">Mahindra</option>
                  </select>
                </div>

                {/* MODEL */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Car Model
                  </label>

                  <select
                    value={model}
                    onChange={(e) => {
                      setModel(e.target.value);
                      setResult(null);
                    }}
                    disabled={!brand}
                    className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:cursor-not-allowed disabled:bg-gray-100"
                  >
                    <option value="">Select Car Model</option>

                    {brand &&
                      carModels[brand]?.map((carModel) => (
                        <option key={carModel} value={carModel}>
                          {carModel}
                        </option>
                      ))}
                  </select>
                </div>

                {/* CAR AGE */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Car Age
                  </label>

                  <input
                    type="number"
                    placeholder="Example: 5 Years"
                    value={age}
                    onChange={(e) => {
                      setAge(e.target.value);
                      setResult(null);
                    }}
                    min="0"
                    max="30"
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                {/* CURRENT KM */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Current Kilometers Driven
                  </label>

                  <input
                    type="number"
                    placeholder="Example: 45000 KM"
                    value={kilometers}
                    onChange={(e) => {
                      setKilometers(e.target.value);
                      setResult(null);
                    }}
                    min="0"
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                {/* LAST SERVICE */}
                <div className="sm:col-span-2">
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Last Service Kilometer
                  </label>

                  <input
                    type="number"
                    placeholder="Example: 40000 KM"
                    value={lastServiceKm}
                    onChange={(e) => {
                      setLastServiceKm(e.target.value);
                      setResult(null);
                    }}
                    min="0"
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>

              </div>

              {/* BUTTONS */}
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">

                <button
                  onClick={calculateMaintenance}
                  disabled={loading}
                  className="w-full flex-1 rounded-xl bg-blue-600 px-5 py-3 font-bold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {loading
                    ? "Calculating..."
                    : "Estimate Maintenance Cost"}
                </button>

                <button
                  onClick={resetForm}
                  disabled={loading}
                  className="w-full rounded-xl border border-gray-300 px-5 py-3 font-semibold text-gray-700 transition hover:bg-gray-100 sm:w-auto"
                >
                  Reset
                </button>

              </div>

            </div>

            {/* INFORMATION CARD */}
            <div className="rounded-2xl bg-white p-5 shadow-lg sm:p-6 lg:p-7">

              <h2 className="text-xl font-bold text-gray-900">
                Why use this tool?
              </h2>

              <div className="mt-6 space-y-5">

                <div className="flex gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-100">
                    🚗
                  </div>

                  <div>
                    <h3 className="font-semibold">
                      Vehicle Based
                    </h3>

                    <p className="mt-1 text-sm text-gray-500">
                      Estimates consider your selected car brand and model.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-green-100">
                    ₹
                  </div>

                  <div>
                    <h3 className="font-semibold">
                      Cost Estimate
                    </h3>

                    <p className="mt-1 text-sm text-gray-500">
                      Get an estimated monthly maintenance expense.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-yellow-100">
                    🔧
                  </div>

                  <div>
                    <h3 className="font-semibold">
                      Service Prediction
                    </h3>

                    <p className="mt-1 text-sm text-gray-500">
                      Know when your next major service may be required.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-purple-100">
                    💡
                  </div>

                  <div>
                    <h3 className="font-semibold">
                      Smart Insights
                    </h3>

                    <p className="mt-1 text-sm text-gray-500">
                      Get useful maintenance recommendations.
                    </p>
                  </div>
                </div>

              </div>
            </div>

          </div>

          {/* RESULT */}
          {result && (
            <div
              id="maintenance-result"
              className="mt-6 rounded-2xl bg-white p-4 shadow-lg sm:p-6 md:p-8"
            >

              {/* RESULT HEADER */}
              <div className="flex flex-col gap-3 border-b pb-5 sm:flex-row sm:items-center sm:justify-between">

                <div>
                  <p className="text-sm text-gray-500">
                    Maintenance Analysis
                  </p>

                  <h2 className="mt-1 text-2xl font-bold text-blue-700 sm:text-3xl">
                    {result.status}
                  </h2>
                </div>

                <span className="w-fit rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-700">
                  Analysis Complete
                </span>

              </div>

              {/* RESULT CARDS */}
              <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">

                <div className="rounded-xl bg-green-50 p-5">
                  <p className="text-sm text-gray-600">
                    Estimated Monthly Cost
                  </p>

                  <p className="mt-2 text-2xl font-bold text-green-600 sm:text-3xl">
                    ₹{result.estimatedMonthlyCost.toLocaleString("en-IN")}
                  </p>
                </div>

                <div className="rounded-xl bg-blue-50 p-5">
                  <p className="text-sm text-gray-600">
                    Next Major Service
                  </p>

                  <p className="mt-2 text-2xl font-bold text-blue-600 sm:text-3xl">
                    {result.nextServiceDueInKm.toLocaleString("en-IN")} km
                  </p>
                </div>

                <div className="rounded-xl bg-purple-50 p-5">
                  <p className="text-sm text-gray-600">
                    Vehicle
                  </p>

                  <p className="mt-2 text-xl font-bold text-purple-600 sm:text-2xl">
                    {brand} {model}
                  </p>

                  <p className="mt-2 text-xs text-gray-500">
                    {age} years old •{" "}
                    {Number(kilometers).toLocaleString("en-IN")} km driven
                  </p>
                </div>

              </div>

              {/* INSIGHTS */}
              <div className="mt-7">

                <h3 className="text-xl font-bold text-gray-900">
                  Maintenance Insights
                </h3>

                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {result.insights.map((insight, index) => (
                    <div
                      key={index}
                      className="flex gap-3 rounded-xl border bg-gray-50 p-4"
                    >
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-100 text-sm font-bold text-blue-700">
                        {index + 1}
                      </span>

                      <p className="text-sm leading-6 text-gray-700">
                        {insight}
                      </p>
                    </div>
                  ))}
                </div>

              </div>

              {/* NOTE */}
              <div className="mt-6 rounded-xl border border-yellow-200 bg-yellow-50 p-4">
                <p className="text-xs leading-5 text-yellow-800">
                  <strong>Note:</strong> This is an estimated maintenance
                  calculation. Actual service and repair costs may vary
                  depending on vehicle condition, service center, location,
                  and driving habits.
                </p>
              </div>

            </div>
          )}

        </div>
      </main>
    </div>
  );
}