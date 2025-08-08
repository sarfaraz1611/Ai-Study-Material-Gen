"use client";
import React from "react";

const SelectedOption = ({ selectedOption, onOptionChange }) => {
  const studyOptions = [
    {
      id: "exam",
      title: "Exam",
      icon: "GraduationCap",
      bgColor: "bg-blue-100",
      hoverColor: "hover:bg-blue-200",
      selectedColor: "bg-blue-300",
      iconColor: "text-blue-600",
    },
    {
      id: "job-interview",
      title: "Job Interview",
      icon: "Briefcase",
      bgColor: "bg-orange-100",
      hoverColor: "hover:bg-orange-200",
      selectedColor: "bg-orange-300",
      iconColor: "text-orange-600",
    },
    {
      id: "practice",
      title: "Practice",
      icon: "BookOpen",
      bgColor: "bg-green-100",
      hoverColor: "hover:bg-green-200",
      selectedColor: "bg-green-300",
      iconColor: "text-green-600",
    },
    {
      id: "coding-prep",
      title: "Coding Prep",
      icon: "Code",
      bgColor: "bg-purple-100",
      hoverColor: "hover:bg-purple-200",
      selectedColor: "bg-purple-300",
      iconColor: "text-purple-600",
    },
    {
      id: "other",
      title: "Other",
      icon: "Book",
      bgColor: "bg-yellow-100",
      hoverColor: "hover:bg-yellow-200",
      selectedColor: "bg-yellow-300",
      iconColor: "text-yellow-600",
    },
  ];

  const getIcon = (iconName) => {
    const iconMap = {
      GraduationCap: "🎓",
      Briefcase: "💼",
      BookOpen: "📖",
      Code: "💻",
      Book: "📚",
    };
    return iconMap[iconName] || "📚";
  };

  const handleOptionClick = (optionId) => {
    onOptionChange(optionId);
  };

  return (
    <div>
      {/* Question */}
      <div className="text-center mb-12">
        <h2 className="text-2xl font-semibold text-gray-800 mb-8">
          For which you want to create your personal study material?
        </h2>

        {/* Options Grid */}
        <div className="flex flex-wrap justify-center gap-6 max-w-4xl mx-auto">
          {studyOptions.map((option) => {
            const isSelected = selectedOption === option.id;

            return (
              <div
                key={option.id}
                onClick={() => handleOptionClick(option.id)}
                className={`
                    relative cursor-pointer transition-all duration-300 ease-in-out transform
                    ${
                      isSelected
                        ? `${option.selectedColor} scale-105 shadow-xl ring-4 ring-blue-300`
                        : `${option.bgColor} ${option.hoverColor} hover:scale-105 hover:shadow-lg`
                    }
                    rounded-2xl p-8 w-48 h-56 flex flex-col items-center justify-center
                    border-2 border-transparent hover:border-gray-200
                  `}
              >
                {/* Selected indicator */}
                {isSelected && (
                  <div className="absolute -top-2 -right-2 bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold shadow-lg">
                    ✓
                  </div>
                )}

                {/* Icon */}
                <div
                  className={`mb-4 p-4 rounded-full ${
                    isSelected ? "bg-white" : "bg-white/50"
                  }`}
                >
                  <div
                    className={`text-5xl ${isSelected ? "animate-pulse" : ""}`}
                  >
                    {getIcon(option.icon)}
                  </div>
                </div>

                {/* Title */}
                <h3
                  className={`text-lg font-semibold ${option.iconColor} text-center`}
                >
                  {option.title}
                </h3>

                {/* Hover effect overlay */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-black/5 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SelectedOption;
