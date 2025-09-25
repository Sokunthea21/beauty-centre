"use client";

import { useState } from "react";
import { User, Lock, Bell, Store, CreditCard, Settings as SettingsIcon } from "lucide-react";
import Link from "next/link"; // Included in case you link to other pages

// --- Configuration ---
// Define the internal settings menu items
const settingsMenu = [
  { id: 'general', name: 'General Settings', icon: <SettingsIcon size={20} /> },
  { id: 'profile', name: 'User Profile', icon: <User size={20} /> },
  { id: 'security', name: 'Security', icon: <Lock size={20} /> },
//   { id: 'notifications', name: 'Notifications', icon: <Bell size={20} /> },
//   { id: 'store', name: 'Store Details', icon: <Store size={20} /> },
//   { id: 'payments', name: 'Payment Gateways', icon: <CreditCard size={20} /> },
];

// --- Reusable Component Helpers ---

const Card: React.FC<{ title: string, description: string, children: React.ReactNode }> = ({ title, description, children }) => (
  <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 mb-6">
    <div className="border-b pb-4 mb-4">
      <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
      <p className="text-sm text-gray-500">{description}</p>
    </div>
    {children}
  </div>
);

// --- Content Components for Tabs (Modular Forms) ---

const GeneralSettings = () => (
  <Card
    title="General Settings"
    description="Configure the basic operational settings of your dashboard."
  >
    <div className="space-y-4">
      <div className="space-y-1">
        <label className="text-sm font-medium text-gray-700">Site Name</label>
        <input type="text" defaultValue="BEAUTY CENTRE" className="w-full border border-gray-300 rounded-lg p-3 focus:ring-pink-500 focus:border-pink-500 transition" />
      </div>
      <div className="space-y-1">
        <label className="text-sm font-medium text-gray-700">Time Zone</label>
        <select className="w-full border border-gray-300 rounded-lg p-3 bg-white focus:ring-pink-500 focus:border-pink-500 transition">
          <option>UTC +7:00 (Phnom Penh)</option>
          <option>UTC -5:00 (New York)</option>
        </select>
      </div>
    </div>
  </Card>
);

const UserProfile = () => (
  <Card
    title="User Profile"
    description="Update your personal information and preferences."
  >
    <div className="space-y-4">
      <div className="space-y-1">
        <label className="text-sm font-medium text-gray-700">Full Name</label>
        <input type="text" defaultValue="Robert Allen" className="w-full border border-gray-300 rounded-lg p-3 focus:ring-pink-500 focus:border-pink-500 transition" />
      </div>
      <div className="space-y-1">
        <label className="text-sm font-medium text-gray-700">Email Address</label>
        <input type="email" defaultValue="robert.allen@admin.com" className="w-full border border-gray-300 rounded-lg p-3 focus:ring-pink-500 focus:border-pink-500 transition" />
      </div>
    </div>
  </Card>
);

const Security = () => (
    <Card
        title="Security"
        description="Manage your password and two-factor authentication."
    >
        <div className="space-y-4">
            <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">Current Password</label>
                <input type="password" placeholder="Enter current password" className="w-full border border-gray-300 rounded-lg p-3 focus:ring-pink-500 focus:border-pink-500 transition" />
            </div>
            <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">New Password</label>
                <input type="password" placeholder="Enter new password" className="w-full border border-gray-300 rounded-lg p-3 focus:ring-pink-500 focus:border-pink-500 transition" />
            </div>
            <div className="flex justify-between items-center border-t pt-4">
                <span className="text-sm font-medium text-gray-700">Two-Factor Authentication</span>
                <button className="text-sm text-pink-500 hover:text-pink-600 font-medium">Enable</button>
            </div>
        </div>
    </Card>
);


// --- Main Layout Component ---

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('general');

  const renderContent = () => {
    switch (activeTab) {
      case 'general':
        return <GeneralSettings />;
      case 'profile':
        return <UserProfile />;
      case 'security':
        return <Security />;
      // Add more content components here as you develop them
      default:
        return <GeneralSettings />;
    }
  };

  return (
    <div className="p-4 bg-gray-50 min-h-screen">
      
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-semibold text-gray-800">Settings</h1>
        <button className="bg-pink-500 hover:bg-pink-600 text-white font-medium py-2 px-4 rounded-lg shadow-md transition duration-150">
          Save Changes
        </button>
      </div>

      {/* Main Settings Area: Two-Column Layout */}
      <div className="flex gap-6">
        
        {/* Left Column: Settings Navigation Menu */}
        <aside className="w-64">
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-4 space-y-1 sticky top-24">
            {settingsMenu.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`
                  flex items-center gap-3 w-full text-left px-3 py-2 rounded-lg transition duration-150
                  ${
                    activeTab === item.id
                      ? "bg-pink-500 text-white shadow-md"
                      : "text-gray-700 hover:bg-gray-100"
                  }
                `}
              >
                {item.icon}
                <span className="font-medium">{item.name}</span>
              </button>
            ))}
          </div>
        </aside>

        {/* Right Column: Content Area */}
        <main className="flex-1 min-w-0">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}