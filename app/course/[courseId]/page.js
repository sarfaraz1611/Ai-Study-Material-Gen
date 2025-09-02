"use client";
// import DashboardHeader from "@/app/dashboard/_components/DashboardHeader";
import axios from "axios";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import CourseIntroCard from "./_components/CourseIntroCard";
import StudyMaterialSection from "./_components/studyMaterialSection";
import ChapterList from "./_components/ChapterList";

function Course() {
  const { courseId } = useParams();
  const [course, setCourse] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (courseId) {
      GetCourse();
    } else {
      setLoading(false);
    }
  }, [courseId]);
  const GetCourse = async () => {
    try {
      setLoading(true);
      const result = await axios.get("/api/courses?courseId=" + courseId);
      setCourse(result.data.result);
    } catch (error) {
      console.error("Error fetching course:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Loading...
      </div>
    );
  }

  if (!course) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Course not found
      </div>
    );
  }

  return (
    <div>
      <div className="">
        {/* Course Intro  */}
        <CourseIntroCard course={course} />
        {/* Study Materials Options  */}
        <StudyMaterialSection courseId={courseId} course={course} />
        {/* Chapter List  */}
        <ChapterList course={course} />
      </div>
    </div>
  );
}

export default Course;
