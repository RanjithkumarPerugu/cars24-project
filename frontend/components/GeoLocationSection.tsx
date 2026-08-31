"use client";

import { useState } from "react";

type Car = {
  id: number;
  brand: string;
  model: string;
  city: string;
};

export default function GeoLocationSection() {
  const [locationStatus, setLocationStatus] = useState(
    "Click the button to detect your location"
  );

  const [detectedCity, setDetectedCity] = useState("");

  const [selectedCity, setSelectedCity] = useState("");

  const [cars, setCars] = useState<Car[]>([]);

  // Sample cars
  const allCars: Car[] = [
    {
      id: 1,
      brand: "Hyundai",
      model: "Creta",
      city: "Chennai",
    },
    {
      id: 2,
      brand: "Maruti",
      model: "Swift",
      city: "Bangalore",
    },
    {
      id: 3,
      brand: "Honda",
      model: "City",
      city: "Hyderabad",
    },
    {
      id: 4,
      brand: "Tata",
      model: "Nexon",
      city: "Chennai",
    },
    {
      id: 5,
      brand: "Mahindra",
      model: "Thar",
      city: "Hyderabad",
    },
  ];

  // Fetch cars by city
  const fetchCarsByCity = (city: string) => {
    const filteredCars = allCars.filter(
      (car) => car.city.toLowerCase() === city.toLowerCase()
    );

    setCars(filteredCars);
  };

  // Detect user location
  const detectLocation = () => {
    if (!navigator.geolocation) {
      setLocationStatus("Geolocation is not supported by your browser.");
      return;
    }

    setLocationStatus("Detecting your location...");

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        console.log("Latitude:", latitude);
        console.log("Longitude:", longitude);

        // Demo city detection
        let city = "Chennai";

        // Example simple location mapping
        if (latitude > 17 && latitude < 18) {
          city = "Hyderabad";
        } else if (latitude > 12 && latitude < 14) {
          city = "Chennai";
        } else if (latitude > 12 && latitude < 14 && longitude > 77) {
          city = "Bangalore";
        }

        setDetectedCity(city);
        setSelectedCity(city);

        setLocationStatus(`Location detected: ${city}`);

        fetchCarsByCity(city);
      },
      (error) => {
        console.error(error);

        if (error.code === 1) {
          setLocationStatus(
            "Location permission denied. Please select a city manually."
          );
        } else if (error.code === 2) {
          setLocationStatus(
            "Location information is unavailable."
          );
        } else if (error.code === 3) {
          setLocationStatus(
            "Location request timed out."
          );
        } else {
          setLocationStatus(
            "Unable to detect your location."
          );
        }
      }
    );
  };

  // Manual city selection
  const handleCityChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const city = event.target.value;

    setSelectedCity(city);

    if (city) {
      setLocationStatus(`Selected city: ${city}`);
      fetchCarsByCity(city);
    } else {
      setCars([]);
      setLocationStatus(
        "Please select a city or detect your location."
      );
    }
  };

  return (
    <section className="mx-auto max-w-6xl px-4 py-10">
      <div className="rounded-xl bg-white p-6 shadow-md">

        <h2 className="text-2xl font-bold text-gray-800">
          Find Cars Near You
        </h2>

        <p className="mt-2 text-gray-600">
          Detect your location or select your city to find available cars.
        </p>

        {/* Location Button */}

        <button
          onClick={detectLocation}
          className="mt-5 rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700"
        >
          📍 Detect My Location
        </button>

        {/* Location Status */}

        <div className="mt-4 rounded-lg bg-gray-100 p-3">
          <p className="text-sm font-medium text-gray-700">
            {locationStatus}
          </p>

          {detectedCity && (
            <p className="mt-1 text-sm text-green-600">
              Detected City: {detectedCity}
            </p>
          )}
        </div>

        {/* City Selection */}

        <div className="mt-6">
          <label className="mb-2 block font-semibold text-gray-700">
            Select City
          </label>

          <select
            value={selectedCity}
            onChange={handleCityChange}
            className="w-full rounded-lg border border-gray-300 p-3 outline-none focus:border-blue-500"
          >
            <option value="">
              Select a city
            </option>

            <option value="Chennai">
              Chennai
            </option>

            <option value="Hyderabad">
              Hyderabad
            </option>

            <option value="Bangalore">
              Bangalore
            </option>
          </select>
        </div>

        {/* Cars */}

        {selectedCity && (
          <div className="mt-8">

            <h3 className="text-xl font-bold text-gray-800">
              Available Cars in {selectedCity}
            </h3>

            {cars.length > 0 ? (
              <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

                {cars.map((car) => (
                  <div
                    key={car.id}
                    className="rounded-lg border p-4 shadow-sm"
                  >
                    <h4 className="text-lg font-bold">
                      {car.brand} {car.model}
                    </h4>

                    <p className="mt-2 text-sm text-gray-600">
                      📍 {car.city}
                    </p>
                  </div>
                ))}

              </div>
            ) : (
              <p className="mt-4 text-gray-600">
                No cars available in this city.
              </p>
            )}

          </div>
        )}

      </div>
    </section>
  );
}