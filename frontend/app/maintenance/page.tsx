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
    // Check empty fields
    if (!brand || !model || !age || !kilometers || !lastServiceKm) {
      alert("Please fill in all details");
      return;
    }

    // Validate car age
    if (Number(age) < 0) {
      alert("Car age cannot be negative");
      return;
    }

    // Validate current kilometers
    if (Number(kilometers) < 0) {
      alert("Kilometers cannot be negative");
      return;
    }

    // Validate last service kilometers
    if (Number(lastServiceKm) < 0) {
      alert("Last service kilometer cannot be negative");
      return;
    }

    // Last service cannot be after current kilometers
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
    } catch (error) {
      console.error(error);

      alert(
        "Unable to connect to backend. Check that dotnet run is running."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />

      <main className="min-h-screen bg-gray-100 px-6 py-12">
        <div className="mx-auto max-w-xl rounded-xl bg-white p-8 shadow-lg">
          {/* Page Heading */}
          <h1 className="text-center text-3xl font-bold">
            Vehicle Maintenance Cost Estimator
          </h1>

          <p className="mt-3 text-center text-gray-600">
            Estimate maintenance costs and predict upcoming service needs.
          </p>

          {/* Form */}
          <div className="mt-8 flex flex-col gap-4">
            {/* Brand */}
            <select
              value={brand}
              onChange={(e) => {
                setBrand(e.target.value);
                setModel("");
                setResult(null);
              }}
              className="rounded-lg border border-gray-300 p-3"
            >
              <option value="">Select Car Brand</option>
              <option value="Hyundai">Hyundai</option>
              <option value="Maruti">Maruti</option>
              <option value="Honda">Honda</option>
              <option value="Tata">Tata</option>
              <option value="Mahindra">Mahindra</option>
            </select>

            {/* Model */}
            <select
              value={model}
              onChange={(e) => {
                setModel(e.target.value);
                setResult(null);
              }}
              disabled={!brand}
              className="rounded-lg border border-gray-300 p-3 disabled:bg-gray-100"
            >
              <option value="">Select Car Model</option>

              {brand &&
                carModels[brand].map((carModel) => (
                  <option key={carModel} value={carModel}>
                    {carModel}
                  </option>
                ))}
            </select>

            {/* Car Age */}
            <input
              type="number"
              placeholder="Car Age in Years"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              min="0"
              className="rounded-lg border border-gray-300 p-3"
            />

            {/* Current Kilometers */}
            <input
              type="number"
              placeholder="Current Kilometers Driven"
              value={kilometers}
              onChange={(e) => setKilometers(e.target.value)}
              min="0"
              className="rounded-lg border border-gray-300 p-3"
            />

            {/* Last Service */}
            <input
              type="number"
              placeholder="Last Service Kilometer"
              value={lastServiceKm}
              onChange={(e) => setLastServiceKm(e.target.value)}
              min="0"
              className="rounded-lg border border-gray-300 p-3"
            />

            {/* Calculate Button */}
            <button
              onClick={calculateMaintenance}
              disabled={loading}
              className="rounded-lg bg-blue-600 p-3 font-bold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading
                ? "Calculating..."
                : "Estimate Maintenance Cost"}
            </button>
          </div>

          {/* Result */}
          {result && (
            <div className="mt-8 rounded-xl border border-gray-200 bg-white p-6 shadow-lg">
              {/* Status */}
              <h2 className="text-2xl font-bold text-blue-700">
                {result.status}
              </h2>

              {/* Monthly Cost */}
              <div className="mt-5 rounded-lg bg-green-50 p-4">
                <p className="text-sm text-gray-600">
                  Estimated Monthly Maintenance Cost
                </p>

                <p className="text-3xl font-bold text-green-600">
                  ₹{result.estimatedMonthlyCost.toLocaleString()}
                </p>
              </div>

              {/* Next Service */}
              <p className="mt-5 font-semibold">
                Next Major Service Due In:{" "}
                {result.nextServiceDueInKm.toLocaleString()} km
              </p>

              {/* Insights */}
              <div className="mt-5">
                <h3 className="font-bold">
                  Maintenance Insights
                </h3>

                <ul className="mt-2 list-disc space-y-2 pl-5">
                  {result.insights.map((insight, index) => (
                    <li key={index}>{insight}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}