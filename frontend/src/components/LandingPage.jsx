import React from 'react';

export default function LandingPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-6">
      <div className="text-center max-w-2xl">
        <h1 className="text-5xl font-bold mb-4">GatherPoint</h1>
        <p className="text-xl mb-8">Premium Dining Management System</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <div className="bg-gray-800 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-2">Staff Login</h3>
            <p className="text-gray-400">Access the POS system and admin dashboard</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-2">Customer Login</h3>
            <p className="text-gray-400">Book tables and order food from your phone</p>
          </div>
        </div>
        
        <div className="space-x-4">
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg">
            Staff Login
          </button>
          <button className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-lg">
            Customer Login
          </button>
        </div>
      </div>
    </div>
  );
}