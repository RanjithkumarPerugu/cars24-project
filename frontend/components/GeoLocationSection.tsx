"use client";

import { useState } from "react";

type Car = {
  id: number;
  brand: string;
  model: string;
  city: string;
  price: string;
};

type Location = {
  name: string;
  type: string;
  address: string;
  city: string;
  latitude: number;
  longitude: number;
};

const allCars: Car[] = [
  {
    id: 1,
    brand: "Hyundai",
    model: "Creta",
    city: "Chennai",
    price: "₹12,00,000",
  },
  {
    id: 2,
    brand: "Tata",
    model: "Nexon",
    city: "Chennai",
    price: "₹10,00,000",
  },
  {
    id: 3,
    brand: "Honda",
    model: "City",
    city: "Hyderabad",
    price: "₹11,00,000",
  },
  {
    id: 4,
    brand: "Mahindra",
    model: "Thar",
    city: "Hyderabad",
    price: "₹15,00,000",
  },
  {
    id: 5,
    brand: "Maruti",
    model: "Swift",
    city: "Bangalore",
    price: "₹7,00,000",
  },
  {
    id: 6,
    brand: "Hyundai",
    model: "Venue",
    city: "Bangalore",
    price: "₹9,00,000",
  },
  {
    id: 7,
    brand: "Tata",
    model: "Harrier",
    city: "Mumbai",
    price: "₹18,00,000",
  },
  {
    id: 8,
    brand: "Kia",
    model: "Seltos",
    city: "Delhi",
    price: "₹16,00,000",
  },
];

const allLocations: Location[] = [
  {
    name: "Cars24 Service Center Chennai",
    type: "Service Center",
    address: "OMR Road, Chennai",
    city: "Chennai",
    latitude: 13.0827,
    longitude: 80.2707,
  },
  {
    name: "Cars24 Pickup Hub Chennai",
    type: "Pickup Point",
    address: "Velachery, Chennai",
    city: "Chennai",
    latitude: 12.9815,
    longitude: 80.218,
  },
  {
    name: "Cars24 Service Center Hyderabad",
    type: "Service Center",
    address: "Hitech City, Hyderabad",
    city: "Hyderabad",
    latitude: 17.4435,
    longitude: 78.3772,
  },
  {
    name: "Cars24 Pickup Hub Hyderabad",
    type: "Pickup Point",
    address: "Gachibowli, Hyderabad",
    city: "Hyderabad",
    latitude: 17.4401,
    longitude: 78.3489,
  },
  {
    name: "Cars24 Service Center Bangalore",
    type: "Service Center",
    address: "Whitefield, Bangalore",
    city: "Bangalore",
    latitude: 12.9698,
    longitude: 77.7499,
  },
];

export default function GeoLocationSection() {
  const [selectedCity, setSelectedCity] = useState("");

  const [locationStatus, setLocationStatus] = useState(
    "Select a city or detect your location"
  );

  const [nearbyCars, setNearbyCars] = useState<Car[]>([]);

  const [nearbyLocations, setNearbyLocations] = useState<Location[]>([]);

  const fetchDataByCity = (city: string) => {
    const normalizedCity = city.trim().toLowerCase();

    const cars = allCars.filter(
      (car) => car.city.trim().toLowerCase() === normalizedCity
    );

    const locations = allLocations.filter(
      (location) =>
        location.city.trim().toLowerCase() === normalizedCity
    );

    console.log("Selected City:", city);
    console.log("Cars Found:", cars);
    console.log("Locations Found:", locations);

    setNearbyCars(cars);
    setNearbyLocations(locations);
  };

  const selectCity = (city: string) => {
    setSelectedCity(city);
    setLocationStatus(`Manually selected: ${city}`);
    fetchDataByCity(city);
  };

  const detectLocation = () => {
    if (!navigator.geolocation) {
      setLocationStatus(
        "Geolocation is not supported by your browser."
      );
      return;
    }

    setLocationStatus("Detecting your location...");

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const latitude = position.coords.latitude;

        console.log("Detected latitude:", latitude);

        // Demo location detection
        // Adjust ranges for your prototype

        let detectedCity = "Chennai";

        if (latitude >= 16 && latitude <= 18) {
          detectedCity = "Hyderabad";
        } else if (latitude >= 12 && latitude < 14) {
          detectedCity = "Chennai";
        } else if (latitude >= 18 && latitude <= 20) {
          detectedCity = "Mumbai";
        }

        setSelectedCity(detectedCity);

        setLocationStatus(
          `Location detected: ${detectedCity}`
        );

        fetchDataByCity(detectedCity);
      },
      () => {
        setLocationStatus(
          "Unable to detect location. Please select a city manually."
        );
      }
    );
  };

  return (
    <section className="mx-auto max-w-6xl px-4 py-10">
      <h2 className="text-3xl font-bold text-gray-900">
        Cars Near You
      </h2>

      <p className="mt-2 text-gray-600">
        See cars available near your current location
      </p>

      {/* LOCATION STATUS */}

      <div className="mt-5 rounded-lg bg-blue-50 p-4">
        <p className="font-medium text-blue-700">
          📍 {locationStatus}
        </p>
      </div>

      {/* DETECT BUTTON */}

      <button
        onClick={detectLocation}
        className="mt-5 rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
      >
        Detect My Location
      </button>

      {/* CITY SELECT */}

      <div className="mt-6">
        <label className="block font-semibold">
          Or Select City Manually
        </label>

        <select
          value={selectedCity}
          onChange={(e) => {
            if (e.target.value) {
              selectCity(e.target.value);
            }
          }}
          className="mt-2 w-full rounded-lg border p-3"
        >
          <option value="">Select City</option>
          <option value="Hyderabad">Hyderabad</option>
          <option value="Bangalore">Bangalore</option>
          <option value="Chennai">Chennai</option>
          <option value="Mumbai">Mumbai</option>
          <option value="Delhi">Delhi</option>
        </select>
      </div>

      {/* CARS */}

      {selectedCity && (
        <div className="mt-8">
          <h3 className="text-2xl font-bold">
            Cars Available in {selectedCity}
          </h3>

          {nearbyCars.length > 0 ? (
            <div className="mt-5 grid gap-5 md:grid-cols-2">
              {nearbyCars.map((car) => (
                <div
                  key={car.id}
                  className="rounded-xl border bg-white p-5 shadow"
                >
                  <h4 className="text-xl font-bold">
                    {car.brand} {car.model}
                  </h4>

                  <p className="mt-2 text-gray-600">
                    📍 {car.city}
                  </p>

                  <p className="mt-3 text-xl font-bold text-green-600">
                    {car.price}
                  </p>

                  <p className="mt-2 text-sm text-blue-600">
                    Available in your selected city
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="mt-5 text-red-500">
              No cars available in this city.
            </p>
          )}
        </div>
      )}

      {/* SERVICE CENTERS */}

      {selectedCity && (
        <div className="mt-10">
          <h3 className="text-2xl font-bold">
            Nearby Service Centers & Pickup Points
          </h3>

          <p className="mt-2 text-gray-600">
            Locations available in {selectedCity}
          </p>

          {nearbyLocations.length > 0 ? (
            <div className="mt-5 grid gap-5 md:grid-cols-2">
              {nearbyLocations.map((location, index) => (
                <div
                  key={index}
                  className="rounded-xl border bg-white p-5 shadow"
                >
                  <h4 className="text-lg font-bold">
                    {location.name}
                  </h4>

                  <p className="mt-2 font-medium text-blue-600">
                    📌 {location.type}
                  </p>

                  <p className="mt-2 text-gray-600">
                    📍 {location.address}
                  </p>

                  <p className="text-gray-600">
                    {location.city}
                  </p>

                  <p className="mt-2 text-sm text-gray-500">
                    Coordinates: {location.latitude},{" "}
                    {location.longitude}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="mt-5 text-red-500">
              No nearby service centers or pickup points available.
            </p>
          )}
        </div>
      )}
    </section>
  );
}