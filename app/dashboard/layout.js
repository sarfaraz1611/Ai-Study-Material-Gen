import React from "react";
import SideBar from "./_components/sideBar";
import DashboardHeader from "./_components/dashboardHeader.jsx";

function DashboardLayout({ children }) {
  return (
    <>
      <div className="md:w-64 hidden md:block fixed">
        <SideBar />
      </div>
      <div className="md:ml-64">
        <DashboardHeader />
        <div className="p-4 ">{children}</div>
      </div>
    </>
  );
}

export default DashboardLayout;
