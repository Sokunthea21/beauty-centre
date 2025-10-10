"use client";
import React, { useState, useCallback } from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";

const defaultCenter = { lat: 11.5564, lng: 104.9282 }; // Phnom Penh

interface DeliveryAddressProps {
  address: string;
  latitude: number;
  longitude: number;
  onAddressChange: (lat: number, lng: number, addr: string) => void;
}

const libraries: ("places" | "geometry" | "drawing" | "visualization")[] = [];

export default function DeliveryAddress({
  address,
  latitude,
  longitude,
  onAddressChange,
}: DeliveryAddressProps) {
  const [center, setCenter] = useState(defaultCenter);
  const [markerPosition, setMarkerPosition] = useState(defaultCenter);
  const [newAddress, setNewAddress] = useState("");

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
    libraries,
  });

  const containerStyle = { width: "100%", height: "300px" };

  const handleMapClick = useCallback(
    (e: google.maps.MapMouseEvent) => {
      if (e.latLng) {
        const lat = e.latLng.lat();
        const lng = e.latLng.lng();

        const addrString = `Selected Location: Lat ${lat.toFixed(
          4
        )}, Lng ${lng.toFixed(4)}`;

        setMarkerPosition({ lat, lng });
        setCenter({ lat, lng });

        onAddressChange(lat, lng, addrString);
      }
    },
    [onAddressChange]
  );

  const handleAddAddress = () => {
    if (newAddress.trim()) {
      onAddressChange(latitude, longitude, newAddress.trim());
      setNewAddress("");
    }
  };

  if (!isLoaded) return <p>Loading map...</p>;

  return (
    <div className="bg-white p-6 mt-6">
      <h2 className="font-semibold mb-4">Delivery Address</h2>

      <p className="text-sm text-gray-500 mb-2">
        **Tip:** Click anywhere on the map to set your precise location.
      </p>

      {/* Map */}
      <div className="h-[300px] w-full rounded overflow-hidden mb-4 border border-gray-300">
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={14}
          onClick={handleMapClick}
        >
          <Marker position={markerPosition} />
        </GoogleMap>
      </div>

      <label className="block mb-1">Confirmed Delivery Address</label>
      <input
        type="text"
        className="w-full border p-2 mb-2 bg-gray-50"
        placeholder="Address selected on map or entered above"
        value={address}
        readOnly
      />
    </div>
  );
}
