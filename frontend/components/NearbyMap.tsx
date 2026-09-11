"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix Leaflet marker icon issue in Next.js

delete (L.Icon.Default.prototype as unknown as {
  _getIconUrl?: unknown;
})._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

type Location = {
  id: number;
  name: string;
  city: string;
  type: string;
  address: string;
  latitude: number;
  longitude: number;
};

type NearbyMapProps = {
  locations: Location[];
  city: string;
};

const cityCoordinates: Record<
  string,
  [number, number]
> = {
  Hyderabad: [17.385, 78.4867],
  Bangalore: [12.9716, 77.5946],
  Chennai: [13.0827, 80.2707],
  Mumbai: [19.076, 72.8777],
  Delhi: [28.6139, 77.209],
};

export default function NearbyMap({
  locations,
  city,
}: NearbyMapProps) {
  const center =
    cityCoordinates[city] || [17.385, 78.4867];

  return (
    <div className="mt-8">
      <h2 className="mb-4 text-center text-2xl font-bold">
        Nearby Locations Map
      </h2>

      <div className="h-[450px] w-full overflow-hidden rounded-xl border shadow-md">
        <MapContainer
          center={center}
          zoom={12}
          scrollWheelZoom={true}
          className="h-full w-full"
        >
          <TileLayer
            attribution='&copy; OpenStreetMap contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {locations.map((location) => (
            <Marker
              key={location.id}
              position={[
                location.latitude,
                location.longitude,
              ]}
            >
              <Popup>
                <div>
                  <strong>{location.name}</strong>

                  <br />

                  📌 {location.type}

                  <br />

                  📍 {location.address}
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
}