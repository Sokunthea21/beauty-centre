"use client";
import React, { useState, useCallback } from "react";
// 1. IMPORT GoogleMap and Marker
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";

const defaultCenter = {
  lat: 11.5564, // Phnom Penh, Cambodia center
  lng: 104.9282,
};

// Define the libraries array for useJsApiLoader (optional but good practice)
const libraries: ("places" | "geometry" | "drawing" | "visualization")[] = [];

interface DeliveryAddressProps {
  address: string;
  onAddressChange: (val: string) => void;
}

export default function DeliveryAddress({
  address,
  onAddressChange,
}: DeliveryAddressProps) {
  // 2. STATE for the map center and marker position
  const [center, setCenter] = useState(defaultCenter);
  const [markerPosition, setMarkerPosition] = useState(defaultCenter);
  const [savedAddresses, setSavedAddresses] = useState<string[]>([]);
  const [newAddress, setNewAddress] = useState("");

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
    libraries: libraries,
  });

  const containerStyle = {
    width: "100%",
    height: "300px",
  };

  const handleAddAddress = () => {
    if (newAddress.trim()) {
      setSavedAddresses([...savedAddresses, newAddress.trim()]);
      // Immediately set the main address to the new saved address
      onAddressChange(newAddress.trim());
      setNewAddress("");
    }
  };
  
  // 3. HANDLER for map clicks
  // This function updates the marker and tries to get the address (Geocoding)
  const handleMapClick = useCallback((e: google.maps.MapMouseEvent) => {
    if (e.latLng) {
      const lat = e.latLng.lat();
      const lng = e.latLng.lng();
      const newPos = { lat, lng };

      setMarkerPosition(newPos);
      setCenter(newPos); // Center map on the new marker position

      // --- Geocoding Logic ---
      // In a real application, you would use the Google Maps Geocoder here
      /* const geocoder = new google.maps.Geocoder();
      geocoder.geocode({ location: newPos }, (results, status) => {
        if (status === "OK" && results && results[0]) {
          const newAddressString = results[0].formatted_address;
          onAddressChange(newAddressString);
        } else {
          console.error("Geocoding failed due to: " + status);
          onAddressChange(`Selected at: Lat ${lat.toFixed(4)}, Lng ${lng.toFixed(4)}`);
        }
      });
      */
      
      // Placeholder for Geocoding:
      onAddressChange(`Selected Location: Lat ${lat.toFixed(4)}, Lng ${lng.toFixed(4)}`);

    }
  }, [onAddressChange]);


  if (!isLoaded) return <p>Loading map...</p>;

  return (
    <div className="bg-white p-6 	mt-6">
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

      {/* Map Guidance */}
      <p className="text-sm text-gray-500 mb-2">
        **Tip:** Click anywhere on the map to set your precise location.
      </p>

      {/* Google Map Implementation */}
      <div className="h-[300px] w-full rounded overflow-hidden mb-4 border border-gray-300">
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center} // Use the center state
          zoom={14}
          onClick={handleMapClick} // 4. ATTACH THE CLICK HANDLER
          options={{
            disableDefaultUI: false, // You can customize UI options here
          }}
        >
          {/* 5. ADD THE MARKER */}
          <Marker position={markerPosition} />
        </GoogleMap>
      </div>
      
      {/* Main Address Input */}
      <label className="block mb-1">Confirmed Delivery Address</label>
      <input
        type="text"
        className="w-full border p-2 mb-2 bg-gray-50" // Make it slightly different as it's often map-driven
        placeholder="Address selected on map or entered above"
        value={address}
        onChange={(e) => onAddressChange(e.target.value)}
        readOnly // Optional: make it read-only if you want the map to be the primary setter
      />

      <button className="w-full mt-4 bg-[var(--primary)] text-white py-2 hover:bg-pink-300">
        Confirm Location & Save
      </button>
    </div>
  );
}