import React from "react";
import DashboardHeader from "../dashboard/_components/dashboardHeader";

function CourseViewLayout({ children }) {
  return (
    <div>
      <DashboardHeader />
      <div className="">{children}</div>
    </div>
  );
}

export default CourseViewLayout;
