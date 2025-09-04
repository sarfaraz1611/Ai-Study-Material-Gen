"use client";
import React, { useState } from "react";
import {
  GraduationCap,
  Target,
  Clock,
  Globe,
  Code,
  Sparkles,
  Rocket,
  Brain,
  Zap,
  Loader,
} from "lucide-react";
import FormField from "./_components/FormField";
import { Input } from "../../components/ui/input";
import LanguageSelector from "./_components/LanguageSelector";
import ProgressIndicator from "./_components/ProgressIndicator";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

function Create() {
  // Define options directly in the component
  const ROLE_OPTIONS = [
    { value: "student", label: "Student" },
    { value: "professional", label: "Professional" },
    { value: "career_changer", label: "Career Changer" },
    { value: "entrepreneur", label: "Entrepreneur" },
    { value: "hobbyist", label: "Hobbyist" },
    { value: "researcher", label: "Researcher" },
  ];

  const GOAL_OPTIONS = [
    { value: "learn_new_skill", label: "Learn New Skill" },
    { value: "advance_career", label: "Advance Career" },
    { value: "prepare_interview", label: "Prepare for Interview" },
    { value: "build_project", label: "Build Project" },
    { value: "certification", label: "Get Certification" },
    { value: "academic_study", label: "Academic Study" },
  ];

  const [profile, setProfile] = useState({
    role: "",
    primaryGoal: "",
    no_of_months: "",
    language_of_content: "",
    languages: [],
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const { user } = useUser();
  const router = useRouter();

  const monthOptions = Array.from({ length: 6 }, (_, i) => ({
    value: (i + 1).toString(),
    label: `${i + 1} month${i + 1 === 1 ? "" : "s"}`,
  }));

  const validateForm = () => {
    const newErrors = {};

    if (!profile.role) newErrors.role = "Please select your role";
    if (!profile.primaryGoal)
      newErrors.primaryGoal = "Please select your primary goal";
    if (!profile.no_of_months)
      newErrors.no_of_months = "Please select duration";
    if (!profile.language_of_content.trim())
      newErrors.language_of_content = "Please enter content language";
    if (profile.languages.length === 0)
      newErrors.languages = "Please add at least one programming language";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const getCompletedSections = () => {
    let completed = 0;
    if (profile.role) completed++;
    if (profile.primaryGoal && profile.no_of_months) completed++;
    if (profile.language_of_content.trim()) completed++;
    if (profile.languages.length > 0) completed++;
    return completed;
  };

  /**
   * Used to Save User Input and Generate Course Layout using AI
   */
  const GenerateCourseOutline = async () => {
    const courseId = uuidv4();
    setLoading(true);

    // Map profile data to the expected format
    const formData = {
      courseType: profile.primaryGoal,
      topic: profile.languages.map((lang) => lang.coding_language).join(", "),
      difficultyLevel:
        profile.languages.length > 0
          ? profile.languages[0].proficiency
          : "Beginner",
      role: profile.role,
      duration: profile.no_of_months,
      contentLanguage: profile.language_of_content,
      languages: profile.languages,
    };

    try {
      const result = await axios.post("/api/generate-course-outline", {
        courseId: courseId,
        ...formData,
        createdBy: user?.primaryEmailAddress?.emailAddress,
      });
      setLoading(false);
      router.replace("/dashboard");
      //Toast Notification
      toast("Your course content is generating, Click on Refresh Button");
      console.log(result.data.result.resp);
    } catch (error) {
      setLoading(false);
      toast.error("Failed to generate course. Please try again.");
      console.error("Error generating course:", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      GenerateCourseOutline();
    }
  };

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <div className="max-w-4xl w-full">
          {/* Main Form Card */}
          <div className="bg-white backdrop-blur-2xl rounded-3xl border border-gray-200 shadow-2xl overflow-hidden ">
            {/* Progress Header */}
            <div className="bg-gradient-to-r from-yellow-600/10 to-amber-600/10 p-8 border-b border-gray-200">
              <ProgressIndicator
                currentStep={getCompletedSections()}
                totalSteps={4}
              />
            </div>

            {/* Form Content */}
            <form onSubmit={handleSubmit} className="p-8 space-y-12">
              {/* Section 1: Role - Creative Card Layout */}
              <div className="space-y-6">
                <div className="flex items-center gap-3 text-2xl font-bold text-gray-800">
                  <div className="icon-container-yellow">
                    <Target className="w-6 h-6 text-white" />
                  </div>
                  Who are you?
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {ROLE_OPTIONS.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() =>
                        setProfile((prev) => ({ ...prev, role: option.value }))
                      }
                      className={`p-6 rounded-2xl border-2 transition-all duration-300 transform hover:scale-105 ${
                        profile.role === option.value
                          ? "bg-gradient-to-br from-yellow-500/20 to-amber-600/20 border-yellow-400 shadow-lg shadow-yellow-500/25"
                          : "bg-gray-50 border-gray-200 hover:bg-gray-100 hover:border-gray-300"
                      }`}
                    >
                      <div className="text-center">
                        <div
                          className={`w-12 h-12 mx-auto mb-3 rounded-xl flex items-center justify-center ${
                            profile.role === option.value
                              ? "bg-yellow-500"
                              : "bg-gray-200"
                          }`}
                        >
                          <GraduationCap
                            className={`w-6 h-6 ${
                              profile.role === option.value
                                ? "text-white"
                                : "text-gray-600"
                            }`}
                          />
                        </div>
                        <p className="font-semibold text-gray-800">
                          {option.label}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
                {errors.role && (
                  <p className="text-red-400 text-sm animate-in slide-in-from-left duration-200">
                    {errors.role}
                  </p>
                )}
              </div>

              {/* Section 2: Goals - Hexagon Layout */}
              <div className="space-y-6">
                <div className="flex items-center gap-3 text-2xl font-bold text-gray-800">
                  <div className="icon-container-yellow">
                    <Rocket className="w-6 h-6 text-white" />
                  </div>
                  What's your mission?
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <FormField
                      label="Primary Goal"
                      required
                      error={errors.primaryGoal}
                    >
                      <div className="space-y-3">
                        {GOAL_OPTIONS.map((option) => (
                          <button
                            key={option.value}
                            type="button"
                            onClick={() =>
                              setProfile((prev) => ({
                                ...prev,
                                primaryGoal: option.value,
                              }))
                            }
                            className={`w-full p-4 rounded-xl border-2 text-left transition-all duration-300 transform hover:scale-102 ${
                              profile.primaryGoal === option.value
                                ? "bg-gradient-to-r from-yellow-500/20 to-orange-600/20 border-yellow-400 shadow-lg shadow-yellow-500/25"
                                : "bg-gray-50 border-gray-200 hover:bg-gray-100 hover:border-gray-300"
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <div
                                className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                                  profile.primaryGoal === option.value
                                    ? "bg-yellow-500"
                                    : "bg-gray-200"
                                }`}
                              >
                                <Target
                                  className={`w-4 h-4 ${
                                    profile.primaryGoal === option.value
                                      ? "text-white"
                                      : "text-gray-600"
                                  }`}
                                />
                              </div>
                              <span className="font-medium text-gray-800">
                                {option.label}
                              </span>
                            </div>
                          </button>
                        ))}
                      </div>
                    </FormField>
                  </div>

                  <div className="space-y-4">
                    <FormField
                      label="Study Duration"
                      required
                      error={errors.no_of_months}
                    >
                      <div className="grid grid-cols-2 gap-3">
                        {monthOptions.map((option) => (
                          <button
                            key={option.value}
                            type="button"
                            onClick={() =>
                              setProfile((prev) => ({
                                ...prev,
                                no_of_months: option.value,
                              }))
                            }
                            className={`p-4 rounded-xl border-2 transition-all duration-300 transform hover:scale-105 ${
                              profile.no_of_months === option.value
                                ? "bg-gradient-to-br from-yellow-500/20 to-amber-600/20 border-yellow-400 shadow-lg shadow-yellow-500/25"
                                : "bg-gray-50 border-gray-200 hover:bg-gray-100 hover:border-gray-300"
                            }`}
                          >
                            <div className="text-center">
                              <Clock
                                className={`w-6 h-6 mx-auto mb-2 ${
                                  profile.no_of_months === option.value
                                    ? "text-yellow-600"
                                    : "text-gray-600"
                                }`}
                              />
                              <p className="font-medium text-gray-800 text-sm">
                                {option.label}
                              </p>
                            </div>
                          </button>
                        ))}
                      </div>
                    </FormField>
                  </div>
                </div>
              </div>

              {/* Section 3: Content Language */}
              <div className="space-y-6">
                <div className="flex items-center gap-3 text-2xl font-bold text-gray-800">
                  <div className="icon-container-orange-yellow">
                    <Globe className="w-6 h-6 text-white" />
                  </div>
                  Content Language
                </div>

                <div className="relative">
                  <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-lg">
                    <FormField
                      label="Preferred Content Language"
                      required
                      error={errors.language_of_content}
                    >
                      <Input
                        placeholder="e.g., English, Spanish, French, Arabic, Hindi"
                        value={profile.language_of_content}
                        onChange={(e) =>
                          setProfile((prev) => ({
                            ...prev,
                            language_of_content: e.target.value,
                          }))
                        }
                        error={!!errors.language_of_content}
                      />
                    </FormField>
                  </div>
                </div>
              </div>

              {/* Section 4: Programming Languages */}
              <div className="space-y-6">
                <div className="flex items-center gap-3 text-2xl font-bold text-gray-800">
                  <div className="icon-container-primary">
                    <Code className="w-6 h-6 text-white" />
                  </div>
                  Technical Skills
                </div>

                <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-lg">
                  <LanguageSelector
                    languages={profile.languages}
                    onChange={(languages) =>
                      setProfile((prev) => ({ ...prev, languages }))
                    }
                    error={errors.languages}
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-8">
                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary"
                >
                  <span className="btn-primary-icon text-lg">
                    {loading ? (
                      <>
                        <Loader className="w-6 h-6 animate-spin" />
                        Generating Your Course...
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-6 h-6" />
                        Create My Learning Profile
                      </>
                    )}
                  </span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Create;
