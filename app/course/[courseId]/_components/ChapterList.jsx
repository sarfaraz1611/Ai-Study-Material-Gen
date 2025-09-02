import React from "react";

function ChapterList({ course }) {
  const courseLayout = course?.courseLayout;
  const chapters = courseLayout?.chapters;

  if (!chapters || chapters.length === 0) {
    return (
      <div className="mt-5">
        <h2 className="font-medium text-xl">Chapters</h2>
        <p className="text-gray-500 mt-2">No chapters available yet.</p>
      </div>
    );
  }

  return (
    <div className="mt-8">
      <h2 className="font-bold text-3xl mb-8 text-gray-800 text-center">
        Course Chapters
      </h2>

      <div className="space-y-12">
        {chapters.map((chapter, chapterIndex) => (
          <div key={chapterIndex} className="flex flex-col items-center">
            {/* Chapter Header Card */}
            <div className="bg-gradient-to-br from-purple-600 via-purple-700 to-purple-800 text-white rounded-2xl p-8 max-w-lg text-center shadow-2xl transform hover:scale-105 transition-all duration-300 border border-purple-400/20">
              <h2 className="text-xl font-semibold mb-4 text-white">
                Chapter {chapterIndex + 1}
              </h2>
              <h3 className="text-2xl font-bold mb-6 text-white leading-tight">
                {chapter.chapter_title}
              </h3>
              <div className="flex justify-between text-sm text-white/90">
                <div>
                  <span className="font-medium">
                    Duration: {chapter.duration}
                  </span>
                </div>
                <div>
                  <span className="font-medium">
                    No. Of Topics: {chapter.topics?.length || 0}
                  </span>
                </div>
              </div>
            </div>

            {/* Vertical Timeline with Topics */}
            <div className="relative w-full max-w-6xl mt-8">
              {/* Vertical connecting line - centered */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-gradient-to-b from-purple-400 via-purple-500 to-purple-600 h-full rounded-full shadow-lg"></div>

              {chapter.topics?.map((topic, topicIndex) => (
                <div
                  key={topicIndex}
                  className="flex items-center w-full mb-10 relative group"
                >
                  {/* Left side content - for even indices (0, 2, 4...) */}
                  {topicIndex % 2 === 0 && (
                    <div className="w-1/2 pr-14 text-right">
                      <div className="bg-white rounded-xl p-4 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-200 transform hover:translate-x-2 inline-block max-w-xs">
                        <p className="text-gray-700 font-medium text-sm leading-relaxed">
                          {topic}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Empty left space when content is on right */}
                  {topicIndex % 2 === 1 && <div className="w-1/2 pr-8"></div>}

                  {/* Center timeline node - ALWAYS CENTERED */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 z-10">
                    <div className="w-14 h-14 bg-gradient-to-br from-gray-500 to-gray-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg border-4 border-white transform group-hover:scale-110 transition-all duration-200 hover:shadow-2xl">
                      {topicIndex + 1}
                    </div>
                  </div>

                  {/* Empty right space when content is on left */}
                  {topicIndex % 2 === 0 && <div className="w-1/2 pl-8"></div>}

                  {/* Right side content - for odd indices (1, 3, 5...) */}
                  {topicIndex % 2 === 1 && (
                    <div className="w-1/2 pl-14 text-left">
                      <div className="bg-white rounded-xl p-4 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-200 transform hover:-translate-x-2 inline-block max-w-xs">
                        <p className="text-gray-700 font-medium text-sm leading-relaxed">
                          {topic}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ChapterList;
