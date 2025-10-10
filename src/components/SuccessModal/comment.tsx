// components/SuccessModal/component.tsx
import { useRouter } from 'next/navigation';
import React from 'react';

interface SuccessModalProps {
  isVisible: boolean;
  onClose: () => void;
  customerEmail: string;
  lastFourCardDigits?: string; // Optional: if you have this info
}

export default function SuccessModal({
  isVisible,
  onClose,
  customerEmail,
  lastFourCardDigits,
}: SuccessModalProps) {
  const router = useRouter();
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-auto relative overflow-hidden">
        {/* Top Section with Image/Icon - PINK GRADIENT */}
        <div className="bg-gradient-to-br from-pink-100 to-fuchsia-100 p-6 flex flex-col items-center justify-center">
          <div className="relative mb-4 w-24 h-24 flex items-center justify-center">
            {/* Simple SVG illustration (pinkish base) */}
            <svg className="absolute w-full h-full text-pink-300 opacity-30" viewBox="0 0 200 100" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 50 L50 0 L150 0 L200 50 L150 100 L50 100 Z" />
              <path d="M100 0 L120 40 L160 40 L130 70 L140 110 L100 90 L60 110 L70 70 L40 40 L80 40 Z" fill="#ffffff"/>
            </svg>
            {/* Checkmark icon (vibrant pink/green for success) */}
            <svg className="w-16 h-16 text-green-500 z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
          <h3 className="text-3xl font-bold text-gray-800 mb-2">Success</h3>
        </div>

        {/* Body Section */}
        <div className="p-8 text-center text-gray-700">
          <p className="mb-4">Order confirmation details sent to your email:</p>
          <p className="font-semibold text-pink-600 mb-6">{customerEmail}</p> {/* PINK TEXT */}

          {lastFourCardDigits && (
            <p className="text-sm text-gray-500">
              Your card ending with *{lastFourCardDigits} has been successfully saved and ready for future purchases.
            </p>
          )}
        </div>

        {/* Action Buttons - PINK BUTTONS */}
        <div className="p-6 border-t border-gray-200 flex flex-col gap-3">
          <button
            className="w-full bg-pink-500 hover:bg-pink-600 text-white font-semibold py-3 px-4 rounded-lg transition duration-200"
            onClick={() => {
              // Implement tracking order navigation
              console.log("Navigating to tracking order...");
              onClose(); // Close modal after action
            }}
          >
            View Tracking Order
          </button>
          <button
            className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-3 px-4 rounded-lg transition duration-200"
            onClick={() => {
              // Implement back home navigation
              console.log("Navigating back home...");
              onClose(); // Close modal after action
              // Example: router.push('/');
              router.push("/");
            }}
          >
            Back Home
          </button>
        </div>
      </div>
    </div>
  );
}