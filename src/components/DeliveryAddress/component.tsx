"use client";
import React, { useState} from "react";
import { useJsApiLoader } from "@react-google-maps/api";

const defaultCenter = {
  lat: 11.5564,
  lng: 104.9282,
};

interface DeliveryAddressProps {
  address: string;
  onAddressChange: (val: string) => void;
}

export default function DeliveryAddress({
  address,
  onAddressChange,
}: DeliveryAddressProps) {
  const [] = useState(defaultCenter);
  const [savedAddresses, setSavedAddresses] = useState<string[]>([]);
  const [newAddress, setNewAddress] = useState("");

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
  });
  // const containerStyle = {
  const handleAddAddress = () => {
    if (newAddress.trim()) {
      setSavedAddresses([...savedAddresses, newAddress.trim()]);
      setNewAddress("");
    }
  };

  if (!isLoaded) return <p>Loading map...</p>;

  return (
    <div className="bg-white p-6  mt-6">
      <h2 className="font-semibold mb-4">Delivery Address</h2>

      {/* Add Address Section */}
      <div className="mb-4">
        <label className="block mb-1 font-medium">Add Address</label>
        <div className="flex gap-2">
          <input
            type="text"
            className="flex-1 border p-2"
            placeholder="Enter new address"
            value={newAddress}
            onChange={(e) => setNewAddress(e.target.value)}
          />
          <button
            onClick={handleAddAddress}
            className="bg-[var(--primary)] text-white px-4 py-2 hover:bg-pink-300"
          >
            Add
          </button>
        </div>

        {/* Saved Addresses List */}
        {savedAddresses.length > 0 && (
          <div className="mt-3">
            <p className="text-sm mb-1 text-gray-600">Saved Addresses:</p>
            <ul className="list-disc pl-5 text-sm text-gray-800">
              {savedAddresses.map((addr, idx) => (
                <li
                  key={idx}
                  className="cursor-pointer hover:underline"
                  onClick={() => onAddressChange(addr)}
                >
                  {addr}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Main Address Input */}
      <label className="block mb-1">Address Title</label>
      <input
        type="text"
        className="w-full border p-2 mb-2"
        placeholder="Enter Title Address"
        value={address}
        onChange={(e) => onAddressChange(e.target.value)}
      />

      {/* Google Map */}
      {/* <div className="h-64 w-full rounded overflow-hidden my-4">
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={markerPosition}
          zoom={13}
          onClick={handleMapClick}
        >
          <Marker position={markerPosition} />
        </GoogleMap>
      </div> */}

      <button className="w-full mt-4 bg-[var(--primary)] text-white py-2 hover:bg-pink-300">
        Save
      </button>
    </div>
  );
}
