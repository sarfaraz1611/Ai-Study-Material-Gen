
"use client";
import React, { useState, useEffect } from "react";
import GamePlayWelcomeBanner from "./_components/welcomebanner.jsx";

function Dashboard() {
  const [activeSection, setActiveSection] = useState("dashboard");

  // Get section from URL parameters or hash
  useEffect(() => {
    const getActiveSectionFromURL = () => {
      // Try getting from URL hash first (e.g., #upgrade)
      const hash = window.location.hash.substring(1);
      if (hash) {
        return hash;
      }

      // Try getting from URL search params (e.g., ?section=upgrade)
      const urlParams = new URLSearchParams(window.location.search);
      const section = urlParams.get('section');
      if (section) {
        return section;
      }

      // Try getting from pathname (e.g., /dashboard/upgrade)
      const pathParts = window.location.pathname.split('/');
      const lastPart = pathParts[pathParts.length - 1];
      if (lastPart && lastPart !== '' && lastPart !== 'dashboard') {
        return lastPart;
      }

      return "dashboard";
    };

    const section = getActiveSectionFromURL();
    setActiveSection(section);

    // Listen for URL changes
    const handlePopState = () => {
      const newSection = getActiveSectionFromURL();
      setActiveSection(newSection);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Function to navigate between sections
  const navigateToSection = (section) => {
    setActiveSection(section);
    // Update URL without page reload
    const newUrl = `${window.location.origin}${window.location.pathname}?section=${section}`;
    window.history.pushState(null, '', newUrl);
  };

  const renderSection = () => {
    switch (activeSection) {
      case "dashboard":
        return <GamePlayWelcomeBanner />;
      case "upgrade":
        return (
          <div className="p-6 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Upgrade Your Plan
            </h2>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Premium Features
              </h3>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center text-gray-700">
                  <svg
                    className="w-5 h-5 text-green-500 mr-3"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Unlimited study sessions
                </li>
                <li className="flex items-center text-gray-700">
                  <svg
                    className="w-5 h-5 text-green-500 mr-3"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Advanced analytics
                </li>
                <li className="flex items-center text-gray-700">
                  <svg
                    className="w-5 h-5 text-green-500 mr-3"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Priority support
                </li>
              </ul>
              <button className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                Upgrade Now
              </button>
            </div>
          </div>
        );
      case "profile":
        return (
          <div className="p-6 bg-gray-50 rounded-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Profile</h2>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                  JD
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">John Doe</h3>
                  <p className="text-gray-600">john.doe@example.com</p>
                </div>
              </div>
              <button className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors">
                Edit Profile
              </button>
            </div>
          </div>
        );
      default:
        return (
          <div className="p-6 bg-red-50 rounded-lg">
            <h2 className="text-2xl font-bold text-red-800 mb-4">Section Not Found</h2>
            <p className="text-red-600 mb-4">The section "{activeSection}" doesn't exist.</p>
            <button 
              onClick={() => navigateToSection('dashboard')}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Go to Dashboard
            </button>
          </div>
        );
    }
  };

  return (
    <div >
      {/* Navigation */}
      {/* <div className="bg-white shadow-sm border-b">
        <div className="px-8 py-4">
          <nav className="flex space-x-4">
            <button
              onClick={() => navigateToSection('dashboard')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                activeSection === 'dashboard'
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
              }`}
            >
              Dashboard
            </button>
            <button
              onClick={() => navigateToSection('upgrade')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                activeSection === 'upgrade'
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
              }`}
            >
              Upgrade
            </button>
            <button
              onClick={() => navigateToSection('profile')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                activeSection === 'profile'
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
              }`}
            >
              Profile
            </button>
          </nav>
        </div>
      </div> */}

      {/* Main Content */}
      <div className="p-4 overflow-auto">
        {renderSection()}
      </div>
    </div>
  );
}

export default Dashboard;