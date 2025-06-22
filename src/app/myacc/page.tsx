// src/app/home/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged, signOut, updateProfile, sendPasswordResetEmail, User } from 'firebase/auth';
import { auth } from '@/lib/firebase/firebase';

// --- Icon Components for the Sidebar ---
const DashboardIcon = () => <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>;
const AccountDetailsIcon = () => <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>;
const OrdersIcon = () => <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path></svg>;
const ChangePasswordIcon = () => <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" ><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" ></path></svg>;
const TrackingIcon = () => <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>;
const LogoutIcon = () => <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>;
// --- End of Icon Components ---

type ActiveTab = 'DASHBOARD' | 'ORDERS' | 'ACCOUNT_DETAILS' | 'CHANGE_PASSWORD' | 'TRACKING';

// --- Mock Data for Tracking ---
const trackingData = {
    orderId: 'BC-178954',
    estimatedDelivery: 'June 25, 2025',
    currentStatus: 'SHIPPED',
    updates: [
        { status: 'DELIVERED', location: 'Siem Reap, Cambodia', timestamp: 'June 25, 2025, 11:30 AM', completed: false },
        { status: 'SHIPPED', location: 'Phnom Penh, Cambodia', timestamp: 'June 23, 2025, 08:00 PM', completed: true },
        { status: 'PROCESSING', location: 'Phnom Penh, Cambodia', timestamp: 'June 22, 2025, 04:15 PM', completed: true },
        { status: 'ORDER CONFIRMED', location: 'Phnom Penh, Cambodia', timestamp: 'June 22, 2025, 02:05 PM', completed: true },
    ]
};
// --- End of Mock Data ---


export default function MyAccountPage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<ActiveTab>('DASHBOARD');
  const router = useRouter();

  // State for editing user profile
  const [displayName, setDisplayName] = useState('');
  const [updateLoading, setUpdateLoading] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState('');
  const [updateError, setUpdateError] = useState('');


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser && currentUser.emailVerified) {
        setUser(currentUser);
        setDisplayName(currentUser.displayName || '');
      } else {
        router.push('/login');
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, [router]);

  useEffect(() => {
      setUpdateSuccess('');
      setUpdateError('');
  }, [activeTab]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push('/login');
    } catch (error) {
      console.error('Error signing out: ', error);
    }
  };
  
  const handleProfileUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (!auth.currentUser) return;

      setUpdateLoading(true);
      setUpdateSuccess('');
      setUpdateError('');

      try {
          await updateProfile(auth.currentUser, { displayName });
          setUpdateSuccess('Profile updated successfully!');
          setUser({ ...auth.currentUser, displayName: displayName } as User);
      } catch (error) {
          setUpdateError('Failed to update profile. Please try again.');
          console.error("Profile update error:", error);
      } finally {
          setUpdateLoading(false);
      }
  };

    const handlePasswordReset = async () => {
        if (!user?.email) {
            setUpdateError("Your email address is not available.");
            return;
        }
        setUpdateLoading(true);
        setUpdateSuccess('');
        setUpdateError('');
        try {
            await sendPasswordResetEmail(auth, user.email);
            setUpdateSuccess(`A password reset link has been sent to ${user.email}. Please check your inbox.`);
        } catch (error) {
            setUpdateError("Failed to send password reset email.");
            console.error(error);
        } finally {
            setUpdateLoading(false);
        }
    };
  
  const getUserName = () => user?.displayName || user?.email?.split('@')[0] || 'User';

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-pink-500"></div>
      </div>
    );
  }
  
  if (!user) return null;

  const renderContent = () => {
    switch (activeTab) {
      case 'DASHBOARD':
        return (
          <div>
            <p className="mb-4">Hello <span className="font-bold">{getUserName()}</span> (not <span className="font-bold">{getUserName()}</span>? <button onClick={handleLogout} className="text-pink-600 hover:underline">Log out</button>)</p>
            <p>From your account dashboard you can view your <button onClick={() => setActiveTab('ORDERS')} className="text-pink-600 hover:underline">recent orders</button>, manage your <button onClick={() => setActiveTab('ACCOUNT_DETAILS')} className="text-pink-600 hover:underline">account details</button>, <button onClick={() => setActiveTab('CHANGE_PASSWORD')} className="text-pink-600 hover:underline">change your password</button>, and <button onClick={() => setActiveTab('TRACKING')} className="text-pink-600 hover:underline">track your order</button>.</p>
          </div>
        );
      case 'ORDERS':
        return <div><h2 className="text-2xl font-bold mb-4">My Orders</h2><p>You have no recent orders.</p></div>;
      case 'ACCOUNT_DETAILS':
        return (
            <div>
                <h2 className="text-2xl font-bold mb-6">Account Details</h2>
                <form onSubmit={handleProfileUpdate} className="max-w-md">
                    <div className="mb-4">
                        <label htmlFor="displayName" className="block text-sm font-medium text-gray-700 mb-1">Display Name</label>
                        <input
                            type="text"
                            id="displayName"
                            value={displayName}
                            onChange={(e) => setDisplayName(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-pink-500 focus:border-pink-500"
                            placeholder="Enter your full name"
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address (cannot be changed)</label>
                        <input
                            type="email"
                            id="email"
                            value={user.email || ''}
                            disabled
                            className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-500 cursor-not-allowed"
                        />
                    </div>
                    {updateSuccess && <p className="text-green-600 text-sm mb-4">{updateSuccess}</p>}
                    {updateError && <p className="text-red-500 text-sm mb-4">{updateError}</p>}
                    <button
                        type="submit"
                        disabled={updateLoading}
                        className="bg-pink-600 text-white px-6 py-2 rounded-md hover:bg-pink-700 transition disabled:bg-pink-300"
                    >
                        {updateLoading ? 'Saving...' : 'Save Changes'}
                    </button>
                </form>
            </div>
        );
      case 'CHANGE_PASSWORD':
        return (
            <div>
                <h2 className="text-2xl font-bold mb-4">Change Password</h2>
                <p className="mb-6 max-w-md">Click the button below to receive a password reset link to your email. For security, you will be logged out after requesting a reset.</p>
                {updateSuccess && <p className="text-green-600 text-sm mb-4">{updateSuccess}</p>}
                {updateError && <p className="text-red-500 text-sm mb-4">{updateError}</p>}
                <button
                    onClick={handlePasswordReset}
                    disabled={updateLoading}
                    className="bg-pink-600 text-white px-6 py-2 rounded-md hover:bg-pink-700 transition disabled:bg-pink-300"
                >
                    {updateLoading ? 'Sending...' : 'Send Password Reset Link'}
                </button>
            </div>
        );
      case 'TRACKING':
        return (
            <div>
                <h2 className="text-2xl font-bold mb-4">Track Your Order</h2>
                <div className="border rounded-lg p-6 mb-8">
                    <div className="flex justify-between items-center mb-4">
                        <div>
                            <p className="font-bold text-lg">Order ID: {trackingData.orderId}</p>
                            <p className="text-sm text-gray-500">Estimated Delivery: {trackingData.estimatedDelivery}</p>
                        </div>
                        <span className="bg-blue-100 text-blue-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded-full">{trackingData.currentStatus}</span>
                    </div>
                </div>

                {/* --- Tracking Timeline --- */}
                <div className="relative pl-8">
                    {trackingData.updates.map((update, index) => (
                        <div key={index} className="relative pb-8">
                            {/* Timeline line */}
                            {index !== trackingData.updates.length - 1 && (
                                <div className="absolute top-4 left-4 -ml-px mt-0.5 h-full w-0.5 bg-gray-300"></div>
                            )}
                            <div className="relative flex items-center space-x-3">
                                {/* Timeline circle/dot */}
                                <div className={`h-8 w-8 rounded-full flex items-center justify-center ${update.completed ? 'bg-pink-500' : 'bg-gray-300'}`}>
                                    <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        {update.completed ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /> : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />}
                                    </svg>
                                </div>
                                {/* Timeline content */}
                                <div className="min-w-0 flex-1">
                                    <p className={`font-semibold ${update.completed ? 'text-gray-800' : 'text-gray-500'}`}>{update.status}</p>
                                    <p className="text-sm text-gray-500">{update.location}</p>
                                    <p className="text-xs text-gray-400 mt-1">{update.timestamp}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
      default:
        return null;
    }
  };
  
  const NavItem: React.FC<{ tab: ActiveTab; icon: JSX.Element; label: string }> = ({ tab, icon, label }) => (
    <button
      onClick={() => setActiveTab(tab)}
      className={`flex items-center w-full text-left px-4 py-3 rounded-lg transition-colors ${
        activeTab === tab
          ? 'bg-pink-500 text-white shadow-md'
          : 'text-gray-600 hover:bg-pink-100 hover:text-pink-600'
      }`}
    >
      {icon}
      <span className="font-medium">{label}</span>
    </button>
  );

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col md:flex-row gap-8 lg:gap-12">
        {/* --- Sidebar --- */}
        <aside className="md:w-1/4 lg:w-1/5">
          <div className="flex flex-col items-center text-center mb-8">
              <div className="w-24 h-24 rounded-full bg-pink-500 text-white flex items-center justify-center mb-4 text-4xl font-bold">
                  {getUserName().charAt(0).toUpperCase()}
              </div>
              <h3 className="font-bold text-lg text-gray-800">{getUserName()}</h3>
              <p className="text-sm text-gray-500">{user.email}</p>
          </div>
          <nav className="space-y-2">
            <NavItem tab="DASHBOARD" icon={<DashboardIcon />} label="Dashboard" />
            <NavItem tab="ORDERS" icon={<OrdersIcon />} label="Orders" />
            <NavItem tab="ACCOUNT_DETAILS" icon={<AccountDetailsIcon />} label="Account Details" />
            <NavItem tab="CHANGE_PASSWORD" icon={<ChangePasswordIcon />} label="Change Password" />
            <NavItem tab="TRACKING" icon={<TrackingIcon />} label="Tracking" />
            <button onClick={handleLogout} className="flex items-center w-full text-left px-4 py-3 rounded-lg text-gray-600 hover:bg-pink-100 hover:text-pink-600 transition-colors">
              <LogoutIcon />
              <span className="font-medium">Logout</span>
            </button>
          </nav>
        </aside>

        {/* --- Main Content --- */}
        <main className="md:w-3/4 lg:w-4/5">
            <div className="bg-white p-6 sm:p-8 rounded-lg shadow-sm min-h-[400px]">
              {renderContent()}
            </div>
        </main>
      </div>
    </div>
  );
}
