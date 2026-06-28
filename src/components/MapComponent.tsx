import React, { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
  useMap,
  useMapEvents,
} from "react-leaflet";
import L from "leaflet";
import axios from "axios";

// Fix for default marker icons in React Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;

L.Icon.Default.mergeOptions({
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
});

// Custom icon for destination
const destIcon = new L.Icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-orange.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

interface MapComponentProps {
  pickupCoords?: { lat: number; lon: number } | null;
  destinationCoords?: { lat: number; lon: number } | null;
  className?: string;
  onRouteCalculated?: (distance: number, duration: number) => void;
}

// Locate Me Control
function LocateControl() {
  const map = useMap();
  return (
    <div className="leaflet-top leaflet-right mt-2 mr-2 z-[400] absolute right-2 top-2">
      <button
        type="button"
        className="bg-white p-2 rounded shadow border border-gray-200 hover:bg-gray-50 focus:outline-none"
        onClick={() => {
          map.locate().on("locationfound", function (e) {
            map.flyTo(e.latlng, map.getZoom());
          });
        }}
        title="Locate me"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10"></circle>
          <path d="M12 2v2"></path>
          <path d="M12 20v2"></path>
          <path d="M2 12h2"></path>
          <path d="M20 12h2"></path>
        </svg>
      </button>
    </div>
  );
}

// Map Click Handler for Reverse Geocoding
function MapEvents() {
  const [clickedLocation, setClickedLocation] = useState<{
    lat: number;
    lon: number;
    address: string;
  } | null>(null);

  useMapEvents({
    click: async (e) => {
      const { lat, lng } = e.latlng;
      try {
        const response = await axios.get(
          `https://nominatim.openstreetmap.org/reverse`,
          {
            params: {
              format: "json",
              lat,
              lon: lng,
            },
          },
        );
        if (response.data && response.data.display_name) {
          setClickedLocation({
            lat,
            lon: lng,
            address: response.data.display_name,
          });
        }
      } catch (error) {
        console.error("Reverse geocoding error", error);
      }
    },
  });

  return clickedLocation ? (
    <Marker
      position={[clickedLocation.lat, clickedLocation.lon]}
      icon={destIcon}
    >
      <Popup>
        <strong>Selected Location:</strong>
        <br />
        {clickedLocation.address}
      </Popup>
    </Marker>
  ) : null;
}

// Map Updater Component
function MapUpdater({
  pickup,
  destination,
}: {
  pickup?: { lat: number; lon: number } | null;
  destination?: { lat: number; lon: number } | null;
}) {
  const map = useMap();

  useEffect(() => {
    if (pickup && destination) {
      const bounds = L.latLngBounds(
        [pickup.lat, pickup.lon],
        [destination.lat, destination.lon],
      );
      map.fitBounds(bounds, { padding: [50, 50] });
    } else if (pickup) {
      map.flyTo([pickup.lat, pickup.lon], 14);
    } else if (destination) {
      map.flyTo([destination.lat, destination.lon], 14);
    }
  }, [pickup, destination, map]);

  return null;
}

export default function MapComponent({
  pickupCoords,
  destinationCoords,
  className = "h-64",
  onRouteCalculated,
}: MapComponentProps) {
  const [route, setRoute] = useState<[number, number][]>([]);

  useEffect(() => {
    const fetchRoute = async () => {
      if (pickupCoords && destinationCoords) {
        try {
          // Using OSRM public API since OpenRouteService requires an API key which is not provided.
          // Note for reliable production systems, host your own OSRM instance or use a paid service like GraphHopper/Mapbox.
          const res = await axios.get(
            `https://router.project-osrm.org/route/v1/driving/${pickupCoords.lon},${pickupCoords.lat};${destinationCoords.lon},${destinationCoords.lat}?overview=full&geometries=geojson`,
          );

          if (res.data && res.data.routes && res.data.routes.length > 0) {
            const routeData = res.data.routes[0];
            const coordinates = routeData.geometry.coordinates.map(
              (coord: number[]) => [coord[1], coord[0]] as [number, number],
            );
            setRoute(coordinates);

            if (onRouteCalculated) {
              onRouteCalculated(routeData.distance, routeData.duration);
            }
          }
        } catch (error) {
          console.error("OSRM Route error", error);
        }
      } else {
        setRoute([]);
      }
    };

    fetchRoute();
  }, [pickupCoords, destinationCoords]);

  return (
    <div
      className={`w-full rounded-xl overflow-hidden shadow-sm border border-gray-200 relative ${className}`}
    >
      <MapContainer
        center={[1.3521, 103.8198]}
        zoom={11}
        scrollWheelZoom={true}
        className="w-full h-full z-0 relative"
      >
        <LocateControl />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapEvents />
        <MapUpdater pickup={pickupCoords} destination={destinationCoords} />

        {pickupCoords && (
          <Marker position={[pickupCoords.lat, pickupCoords.lon]}>
            <Popup>Pickup Location</Popup>
          </Marker>
        )}

        {destinationCoords && (
          <Marker
            position={[destinationCoords.lat, destinationCoords.lon]}
            icon={destIcon}
          >
            <Popup>Destination</Popup>
          </Marker>
        )}

        {route.length > 0 && (
          <Polyline
            positions={route}
            color="#E9A23B"
            weight={5}
            opacity={0.8}
          />
        )}
      </MapContainer>
    </div>
  );
}
