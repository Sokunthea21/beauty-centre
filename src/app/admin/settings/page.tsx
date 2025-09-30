"use client";

import { useState } from "react";
import { User, Lock } from "lucide-react";

// --- Configuration ---
// Define the internal settings menu items (used as tabs)
const accountTabs = [
    { id: 'general', name: 'General', icon: User },
    { id: 'security', name: 'Security', icon: Lock },
];

// --- Reusable Component Helpers (Simplified for this view) ---

interface ActionInputFieldProps {
    label: string;
    value: string;
    type?: string;
    actionText: 'Save' | 'Edit';
    onClick: () => void;
    required?: boolean;
}

const ActionInputField: React.FC<ActionInputFieldProps> = ({
    label,
    value,
    type = "text",
    actionText,
    onClick,
    required = false,
}) => (
    <div className="flex items-center border-b border-gray-100 py-4">
        <div className="flex-1 mr-4">
            <label className="block text-xs text-gray-400">
                {label}
                {required && <span className="text-red-500">*</span>}
            </label>
            {/* Input is read-only or styled to look like static text when not being actively edited */}
            <input
                type={type}
                value={value}
                readOnly
                className={`w-full text-lg font-medium outline-none bg-white text-gray-700`}
            />
        </div>
        
        {/* Action Button (Save or Edit) */}
        <button
            onClick={onClick}
            className={`text-sm font-semibold whitespace-nowrap text-pink-600 hover:text-pink-800 transition-colors`}
        >
            {actionText}
        </button>
    </div>
);


// --- Content Component: General Tab ---

const GeneralTabContent: React.FC = () => {
    // Mock state for handling edit actions
    const [isEditingName, setIsEditingName] = useState(false);
    const [isEditingEmail, setIsEditingEmail] = useState(false);
    
    // Using an emoji as a placeholder for the user image
    const userImage = "👋";

    return (
        <div className="space-y-8">
            
            {/* 1. Basic Details Card */}
            <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-md">
                <h2 className="text-lg font-semibold text-gray-800 mb-6">Basic details</h2>
                
                {/* Profile Picture Section (Centered layout) */}
                <div className="flex items-center space-x-6 mb-6">
                    <div className="w-16 h-16 flex items-center justify-center bg-purple-100 rounded-full text-4xl border border-purple-300">
                        {userImage}
                    </div>
                    <button className="text-pink-600 font-medium hover:text-pink-800 text-sm">
                        Change
                    </button>
                </div>

                {/* Full Name Field */}
                <ActionInputField
                    label="Full Name"
                    value="Anika Visser"
                    actionText={isEditingName ? 'Save' : 'Edit'}
                    onClick={() => setIsEditingName(!isEditingName)}
                />

                {/* Email Address Field */}
                <ActionInputField
                    label="Email Address"
                    value="anika.visser@devias.io"
                    actionText={isEditingEmail ? 'Save' : 'Edit'}
                    onClick={() => setIsEditingEmail(!isEditingEmail)}
                    required={true}
                />
            </div>

            {/* 2. Delete Account Section (Separate Block) */}
            <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-md">
                <h2 className="text-lg font-semibold text-gray-800 mb-2">Delete Account</h2>
                <div className="flex justify-between items-center">
                    <p className="text-sm text-gray-500 max-w-sm">
                        Delete your account and all of your source data. This is irreversible.
                    </p>
                    <button className="text-sm text-red-500 border border-red-500 px-4 py-2 rounded-lg hover:bg-red-50 transition-colors font-medium">
                        Delete account
                    </button>
                </div>
            </div>
        </div>
    );
};

// --- Content Component: Security Tab ---

const SecurityTabContent: React.FC = () => (
    <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-md">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Password Settings</h2>
        <p className="text-sm text-gray-500 mb-6">Update your password securely.</p>
        <div className="space-y-4">
            <input type="password" placeholder="Current Password" className="w-full border border-gray-300 rounded-lg p-3" />
            <input type="password" placeholder="New Password" className="w-full border border-gray-300 rounded-lg p-3" />
        </div>
        <button className="mt-6 bg-pink-500 hover:bg-pink-600 text-white font-medium py-2 px-4 rounded-lg transition duration-150">
            Change Password
        </button>
    </div>
);


// --- Main Layout Component (SettingsPage) ---

export default function AccountSettingsPage() {
    const [activeTab, setActiveTab] = useState('general');

    const renderContent = () => {
        switch (activeTab) {
            case 'general':
                return <GeneralTabContent />;
            case 'security':
                return <SecurityTabContent />;
            default:
                return <GeneralTabContent />;
        }
    };

    return (
        <div className="p-8 min-h-screen">
            <div className=" mx-auto">
                
                {/* Header (Account Title) */}
                <h1 className="text-3xl font-bold text-gray-900 mb-6">Account</h1>

                {/* Tabs */}
                <div className="flex space-x-4 border-b border-gray-200 mb-6">
                    {accountTabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`
                                pb-2 px-1 text-base font-medium transition duration-150 
                                ${
                                    activeTab === tab.id
                                        ? "border-b-2 border-pink-500 text-pink-600"
                                        : "text-gray-500 hover:text-gray-700"
                                }
                            `}
                        >
                            {tab.name}
                        </button>
                    ))}
                </div>

                {/* Content Area */}
                <div className="min-w-0">
                    {renderContent()}
                </div>
            </div>
        </div>
    );
}