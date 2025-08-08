"use client";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import { Progress } from "./../../../components/ui/progress";

const menuList = [
  {
    name: "Dashboard",
    path: "/dashboard",
    icon: (
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
        />
      </svg>
    ),
  },
  {
    name: "Upgrade",
    path: "/dashboard/upgrade",
    icon: (
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
        />
      </svg>
    ),
  },
  {
    name: "Profile",
    path: "/profile",
    icon: (
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
        />
      </svg>
    ),
  },
];

function SideBar() {
  const pathname = usePathname();
  const router = useRouter();

  // Credits state - you can replace this with actual state management
  const totalCredits = 5;
  const usedCredits = 2;
  const availableCredits = totalCredits - usedCredits;
  const progressPercentage = (usedCredits / totalCredits) * 100;

  const handleNavigation = (item) => {
    router.push(item.path);
  };

  // Function to check if current path matches menu item
  const isActive = (itemPath) => {
    if (itemPath === "/dashboard") {
      // For dashboard, only match exact path or when on dashboard root
      return pathname === "/dashboard" || pathname === "/dashboard/";
    }
    // For other paths, check if current path starts with the item path
    return pathname === itemPath || pathname.startsWith(itemPath + "/");
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full flex items-center justify-center">
              <svg
                className="w-5 h-5 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                <path
                  fillRule="evenodd"
                  d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <h1 className="text-xl font-bold text-gray-800">Easy Study</h1>
          </div>
        </div>

        {/* Create New Button */}
        <div className="p-4">
          <button
            onClick={() => router.push("/create")}
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center space-x-2 shadow-md hover:shadow-lg"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>

            <span>Create New</span>
          </button>
        </div>

        {/* Navigation Menu */}
        <nav className="px-4 flex-1">
          <ul className="space-y-2">
            {menuList.map((item, index) => (
              <li key={index}>
                <button
                  onClick={() => handleNavigation(item)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all duration-200 ${
                    isActive(item.path)
                      ? "bg-blue-50 text-blue-600 border-l-4 border-blue-600"
                      : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                  } hover:shadow-sm`}
                >
                  <span
                    className={`${
                      isActive(item.path) ? "text-blue-600" : "text-gray-500"
                    }`}
                  >
                    {item.icon}
                  </span>
                  <span className="font-medium">{item.name}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Credits Section at Bottom */}
        <div className="p-4 border-t border-gray-200 bg-gray-50">
          <div className="space-y-3">
            <div>
              <h3 className="text-lg font-semibold text-gray-800">
                Available Credits: {availableCredits}
              </h3>
            </div>

            <div className="space-y-2">
              <Progress
                value={progressPercentage}
                className="h-2 bg-gray-200"
              />
              <p className="text-sm text-gray-600">
                {usedCredits} Out of {totalCredits} Credits Used
              </p>
            </div>

            <button
              onClick={() => router.push("/dashboard/upgrade")}
              className="text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors duration-200"
            >
              Upgrade to create more
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SideBar;
