"use client";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import CourseCardItem from "./CourseCarditem";
import { Button } from "./../../../components/ui/button";
import { RefreshCw } from "lucide-react";
import { CourseCountContext } from "../../_context/CourseCountContext";
import { BookOpen, Plus } from "lucide-react";
import Link from "next/link";

function CourseList() {
  const { user } = useUser();
  const [courseList, setCourseList] = useState([]);
  const [loading, setLoading] = useState(false);
  const { totalCourse, setTotalCourse } = useContext(CourseCountContext);
  useEffect(() => {
    user && GetCourseList();
  }, [user]);

  const GetCourseList = async () => {
    setLoading(true);
    const result = await axios.post("/api/courses", {
      createdBy: user?.primaryEmailAddress?.emailAddress,
    });
    console.log(result);
    setCourseList(result.data.result);
    setLoading(false);
    setTotalCourse(result.data.result?.length);
  };

  // Empty state component
  const EmptyState = () => (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="w-32 h-32 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center mb-6">
        <BookOpen className="w-16 h-16 text-blue-600 mt-2" />
      </div>
      <h3 className="text-2xl font-bold text-gray-900 mb-3">No Courses Yet</h3>
      <p className="text-gray-600 mb-8 max-w-sm">
        Create your first study material to get started
      </p>
      <Link href="/create">
        <Button className="bg-gradient-to-br from-blue-600 via-blue-500 to-purple-600 hover:from-blue-700 hover:via-blue-600 hover:to-purple-700 text-white px-8 py-3 text-lg shadow-lg">
          <Plus className="w-5 h-5 mr-2" />
          Create Course
        </Button>
      </Link>
    </div>
  );

  return (
    <div className="mt-10">
      <h2 className="font-bold text-2xl flex justify-between items-center">
        Your Study Material
        <Button
          variant="outline"
          onClick={GetCourseList}
          className="border-primary text-primary"
        >
          {" "}
          <RefreshCw /> Refresh
        </Button>
      </h2>

      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 mt-2 gap-5">
          {[1, 2, 3, 4, 5, 6].map((item, index) => (
            <div
              key={index}
              className="h-56 w-full bg-slate-200 rounded-lg animate-pulse"
            ></div>
          ))}
        </div>
      ) : courseList && courseList.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 mt-2 gap-5">
          {courseList.map((course, index) => (
            <CourseCardItem course={course} key={index} />
          ))}
        </div>
      ) : (
        <EmptyState />
      )}
    </div>
  );
}

export default CourseList;
