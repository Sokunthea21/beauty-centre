"use client";

import { assets } from "@/app/assets/assets";
import { useState } from "react";
import Image from "next/image";

import type { StaticImageData } from "next/image";

interface PaymentOption {
  id: string;
  name: string;
  description: string;
  logo: string | StaticImageData;
}

interface Props {
  selectedPayment: string | null;
  onChange: (id: string) => void;
  total?: number; // optional, so we can show order total in QR modal
}

// --- Component: ABA QR & Payslip Upload Modal ---
// Combines the QR display and the payslip upload steps.
const ABA_QR_PayslipModal = ({ onClose, total }: { onClose: () => void; total?: number }) => {
  const [step, setStep] = useState<'qr' | 'upload'>('qr');
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileUpload = async () => {
    if (!file) {
      alert("Please select a file to upload.");
      return;
    }
    // Placeholder for actual file upload logic
    setIsUploading(true);
    console.log("Uploading file:", file.name);

    // Simulate an API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsUploading(false);
    alert("Payslip uploaded successfully! Your order will be confirmed soon.");
    onClose(); // Close modal after successful upload
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white p-6 w-[340px] relative shadow-xl rounded-xs">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
        >
          ✕
        </button>

        <div className="text-center">
          <h3 className="text-xl font-bold mb-4">{step === 'qr' ? "ABA KHQR Payment" : "Upload Proof of Payment"}</h3>
          
          {/* Step 1: Show QR */}
          {step === 'qr' && (
            <>
              <p className="text-2xl font-bold text-gray-800 mb-2">
                {total ? total.toFixed(2) : "0.00"} USD
              </p>
              <p className="text-sm text-gray-500 mb-4">Scan to Pay using any banking app.</p>

              {/* Replace with your real QR code image */}
              <Image
                src={assets.KHQR}
                alt="ABA QR Code"
                className="mx-auto w-60 h-60"
              />
              
              <button
                onClick={() => setStep('upload')}
                className="mt-4 w-full py-3 rounded-xs font-semibold text-white bg-[var(--primary)] hover:bg-pink-600 transition"
              >
                Upload Payslip
              </button>
            </>
          )}

          {/* Step 2: Upload Payslip */}
          {step === 'upload' && (
            <>
              <p className="text-sm text-gray-600 mb-4">
                Please upload the payslip/receipt from your banking app to confirm the payment of 
                <span className="font-bold text-lg text-gray-800 ml-1">
                  {total ? total.toFixed(2) : "0.00"} USD
                </span>.
              </p>

              <div className="border border-dashed border-gray-400 p-4 rounded-lg mb-4 hover:bg-gray-50 transition">
                <input 
                  type="file" 
                  accept="image/*, application/pdf" // Allows images and PDF
                  onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
                  className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-pink-50 file:text-pink-600 hover:file:bg-pink-100"
                />
                {file && <p className="mt-2 text-sm text-green-600">Selected: {file.name}</p>}
              </div>

              <button
                onClick={handleFileUpload}
                disabled={!file || isUploading}
                className={`w-full py-3 rounded-xs font-semibold text-white transition ${
                  !file || isUploading ? 'bg-[var(--primary)] cursor-not-allowed' : 'bg-primary hover:bg-pink-600'
                }`}
              >
                {isUploading ? "Submitting..." : "Submit Payslip"}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
// ------------------------------------------


export default function PaymentOptions({ selectedPayment, onChange, total }: Props) {
  // Renamed the state back to showQR as it only relates to the ABA option now.
  const [showQR, setShowQR] = useState(false);

  const paymentOptions: PaymentOption[] = [
    {
      id: "aba",
      name: "ABA KHQR (Requires Payslip Upload)", // Updated name to reflect the requirement
      description: "Scan to pay, then upload the receipt for confirmation.",
      logo: assets.ABA
    },
    {
      id: "cod",
      name: "Cash on Delivery",
      description: "Pay with cash when product arrival.",
      logo: assets.cod
    },
  ];

  const handleSelect = (id: string) => {
    onChange(id);
    // Only show the combined modal for ABA
    if (id === "aba") {
      setShowQR(true); // open the combined QR/Payslip modal
    } else {
      setShowQR(false); // close modal for COD
    }
  };

  return (
    <div className="bg-white p-6 mb-6">
      <h2 className="font-semibold mb-4">SELECT PAYMENT OPTIONS</h2>
      <div className="space-y-3">
        {paymentOptions.map((opt) => (
          <div
            key={opt.id}
            className={`flex items-center gap-3 border p-3 cursor-pointer transition ${
              selectedPayment === opt.id ? "border-pink-500 bg-pink-50" : "hover:border-pink-300"
            }`}
            onClick={() => handleSelect(opt.id)}
          >
            <Image src={opt.logo} alt={opt.name} className="w-12 h-12 object-contain" />
            <div>
              <p className="font-medium">{opt.name}</p>
              <p className="text-sm text-gray-500">{opt.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* ABA QR & Payslip Modal */}
      {showQR && (
        <ABA_QR_PayslipModal 
          onClose={() => setShowQR(false)} 
          total={total} 
        />
      )}
    </div>
  );
}