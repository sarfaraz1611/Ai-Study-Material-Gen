import Image from "next/image";
import React from "react";
import { Progress } from "../../../../components/ui/progress";

function CourseIntroCard({ course }) {
  return (
    <div className="w-full relative overflow-hidden bg-gradient-to-br from-purple-600 via-purple-700 to-purple-800 text-white rounded-2xl p-8 shadow-2xl transform hover:scale-105 transition-all duration-300 border border-purple-400/20">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-purple-400/20 to-transparent rounded-full -translate-y-10 translate-x-10"></div>
      <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-purple-300/20 to-transparent rounded-full translate-y-8 -translate-x-8"></div>

      {/* Chapter Count - Top Right */}
      <div className="absolute top-4 right-4 z-10">
        <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-3 py-1.5 rounded-full shadow-lg border border-white/30">
          <span className="text-sm font-semibold">
            Total Chapters: {course?.courseLayout?.chapters?.length}
          </span>
        </div>
      </div>

      <div className="relative flex gap-4 items-start">
        {/* Course Icon */}
        <div className="flex-shrink-0">
          <div className="relative">
            <div className="absolute inset-0 bg-white/20 rounded-xl blur-sm opacity-40"></div>
            <div className="relative bg-white/20 backdrop-blur-sm border border-white/30 p-3 rounded-xl shadow-md">
              <Image
                src={"/knowledge.png"}
                alt="Course Icon"
                width={50}
                height={50}
                className="drop-shadow-sm"
              />
            </div>
          </div>
        </div>

        {/* Course Content */}
        <div className="flex-1 min-w-0">
          <h2 className="font-bold text-3xl text-white mb-2">
            {course?.courseLayout.course_title ||
              course?.courseLayout?.courseTitle}
          </h2>

          <p className="text-purple-100 text-base leading-relaxed mb-4 max-w-xl">
            {course?.courseLayout?.summary}
          </p>

          {/* Progress Section */}
          <div className="space-y-2 mb-4">
            <div className="flex items-center justify-between text-sm text-purple-100 mb-1">
              <span className="font-medium">Course Progress</span>
              <span className="text-purple-200 font-semibold">0%</span>
            </div>
            <Progress className="h-2 bg-purple-300/30" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CourseIntroCard;
