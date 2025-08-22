"use client";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import CourseCardItem from "./CourseCarditem";
import { Button } from "../../../components/ui/button";
import { RefreshCw, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { CourseCountContext } from "../../_context/CourseCountContext";

function CourseList() {
  const { user } = useUser();
  const [courseList, setCourseList] = useState([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { totalCourse, setTotalCourse } = useContext(CourseCountContext);
  useEffect(() => {
    user && GetCourseList();
  }, [user]);

  const GetCourseList = async () => {
    setLoading(true);
    const result = await axios.post("/api/courses", {
      createdBy: user?.primaryEmailAddress?.emailAddress,
    });
    setCourseList(result.data.result);
    setLoading(false);
    setTotalCourse(result.data.result?.length);
  };
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

      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 mt-2 gap-5">
        {loading ? (
          [1, 2, 3, 4, 5, 6].map((item, index) => (
            <div
              key={index}
              className="h-56 w-full bg-slate-200 rounded-lg animate-pulse"
            ></div>
          ))
        ) : courseList?.length === 0 ? (
          <div className="col-span-full flex flex-col items-center justify-center py-16">
            <div className="w-48 h-48 mb-6">
              <img
                src="/knowledge.png"
                alt="No courses"
                className="w-full h-full object-contain opacity-60"
              />
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              No Study Materials Yet
            </h3>
            <p className="text-gray-500 text-center mb-6 max-w-md">
              Start creating your personalized study materials to enhance your
              learning experience.
            </p>
            <Button
              onClick={() => router.push("/create")}
              className="bg-primary hover:bg-primary/90 text-white px-6 py-3"
            >
              <Plus className="mr-2 h-4 w-4" />
              Create Your First Course
            </Button>
          </div>
        ) : (
          courseList?.map((course, index) => (
            <CourseCardItem course={course} key={index} />
          ))
        )}
      </div>
    </div>
  );
}

export default CourseList;
