"use client";

import Link from "next/link";

export default function CarsPage() {
  const cars = [
    {
      id: "1",
      name: "Hyundai Creta",
      price: "₹12,00,000",
      image: "/images/creta.jpg",
    },
    {
      id: "2",
      name: "Maruti Swift",
      price: "₹8,00,000",
      image: "/images/swift.jpg",
    },
    {
      id: "3",
      name: "Honda City",
      price: "₹14,00,000",
      image: "/images/city.jpg",
    },
  ];

  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      <h1 className="text-3xl font-bold">Available Cars</h1>

      <p className="mt-2 text-gray-600">
        Explore our collection of quality used cars
      </p>

      <div className="mt-8 grid gap-6 md:grid-cols-3">
        {cars.map((car) => (
          <div
            key={car.id}
            className="overflow-hidden rounded-xl border bg-white shadow"
          >
            <img
              src={car.image}
              alt={car.name}
              className="h-48 w-full object-cover"
            />

            <div className="p-5">
              <h2 className="text-xl font-bold">
                {car.name}
              </h2>

              <p className="mt-2 text-lg font-semibold text-green-600">
                {car.price}
              </p>

              <Link
                href={`/cars/${car.id}`}
                className="mt-4 inline-block rounded-lg bg-blue-600 px-4 py-2 text-white"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}