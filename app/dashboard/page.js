import React from "react";
import WelcomeBanner from "./_components/welcomebanner";
import CourseList from "./_components/CourseList";

function Dashboard() {
  return (
    <div>
      <WelcomeBanner />
      <CourseList />
    </div>
  );
}

export default Dashboard;
