import Link from "next/link";

const cars = [
  {
    id: "1",
    slug: "creta",
    name: "Hyundai Creta",
    price: "₹12,00,000",
    year: 2022,
    fuel: "Petrol",
    transmission: "Automatic",
  },
  {
    id: "2",
    slug: "swift",
    name: "Maruti Swift",
    price: "₹8,00,000",
    year: 2021,
    fuel: "Petrol",
    transmission: "Manual",
  },
  {
    id: "3",
    slug: "city",
    name: "Honda City",
    price: "₹14,00,000",
    year: 2023,
    fuel: "Petrol",
    transmission: "Automatic",
  },
];

export default async function CarDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const car = cars.find(
    (car) =>
      car.id === id ||
      car.slug === id?.toLowerCase()
  );

  // CAR NOT FOUND
  if (!car) {
    return (
      <div className="mx-auto max-w-4xl px-6 py-12">
        <h1 className="text-3xl font-bold text-red-600">
          Car Not Found
        </h1>

        <p className="mt-3 text-gray-600">
          The car you are looking for does not exist.
        </p>

        <Link
          href="/cars"
          className="mt-6 inline-block rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700"
        >
          ← Back to Cars
        </Link>
      </div>
    );
  }

  // CAR DETAILS
  return (
    <div className="mx-auto max-w-4xl px-6 py-12">

      {/* BACK BUTTON */}
      <Link
        href="/cars"
        className="text-blue-600 hover:underline"
      >
        ← Back to Cars
      </Link>

      {/* CAR DETAILS CARD */}
      <div className="mt-6 rounded-xl border bg-white p-8 shadow">

        <h1 className="text-3xl font-bold">
          {car.name}
        </h1>

        <p className="mt-3 text-2xl font-bold text-green-600">
          {car.price}
        </p>

        <p className="mt-2 text-gray-600">
          Certified used car with verified details.
        </p>

        {/* CAR INFORMATION */}
        <div className="mt-6 grid gap-4 md:grid-cols-2">

          <div className="rounded-lg bg-gray-100 p-4">
            <p className="text-gray-600">
              Year
            </p>

            <p className="text-lg font-semibold">
              {car.year}
            </p>
          </div>

          <div className="rounded-lg bg-gray-100 p-4">
            <p className="text-gray-600">
              Fuel Type
            </p>

            <p className="text-lg font-semibold">
              {car.fuel}
            </p>
          </div>

          <div className="rounded-lg bg-gray-100 p-4">
            <p className="text-gray-600">
              Transmission
            </p>

            <p className="text-lg font-semibold">
              {car.transmission}
            </p>
          </div>

          <div className="rounded-lg bg-gray-100 p-4">
            <p className="text-gray-600">
              Car ID
            </p>

            <p className="text-lg font-semibold">
              {car.id}
            </p>
          </div>

        </div>

        {/* BOOK TEST DRIVE BUTTON */}
        <Link
          href={`/test-drive?car=${car.slug}`}
          className="mt-8 inline-block rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
        >
          Book Test Drive
        </Link>

      </div>
    </div>
  );
}