import React, { useState } from 'react';
import { GraduationCap, Target, Clock, Globe, Code, Sparkles, Rocket, Brain, Zap } from 'lucide-react';
import { ROLE_OPTIONS, GOAL_OPTIONS } from '../types/Profile';
import FormField from './FormField';
import { Input } from "../../../components/ui/input";
import LanguageSelector from './LanguageSelector';
import ProgressIndicator from './ProgressIndicator';

export default function ProfileForm() {
  const [profile, setProfile] = useState({
    role: '',
    primaryGoal: '',
    no_of_months: '',
    language_of_content: '',
    languages: []
  });

  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const monthOptions = Array.from({ length: 6 }, (_, i) => ({
    value: (i + 1).toString(),
    label: `${i + 1} month${i + 1 === 1 ? '' : 's'}`
  }));

  const validateForm = () => {
    const newErrors = {};

    if (!profile.role) newErrors.role = 'Please select your role';
    if (!profile.primaryGoal) newErrors.primaryGoal = 'Please select your primary goal';
    if (!profile.no_of_months) newErrors.no_of_months = 'Please select duration';
    if (!profile.language_of_content.trim()) newErrors.language_of_content = 'Please enter content language';
    if (profile.languages.length === 0) newErrors.languages = 'Please add at least one programming language';

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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitted(true);
      console.log('Profile submitted:', profile);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-violet-900 via-purple-900 to-indigo-900 flex items-center justify-center p-4 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-pink-400/20 to-purple-600/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-cyan-600/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-emerald-400/10 to-teal-600/10 rounded-full blur-3xl animate-pulse delay-500"></div>
        </div>

        <div className="max-w-lg w-full relative z-10">
          {/* Success Animation */}
          <div className="text-center mb-8 animate-in zoom-in duration-1000">
            <div className="relative inline-block">
              <div className="w-24 h-24 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl animate-bounce">
                <Rocket className="w-12 h-12 text-white" />
              </div>
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center animate-spin">
                <Sparkles className="w-4 h-4 text-yellow-800" />
              </div>
            </div>
          </div>

          {/* Success Card */}
          <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl animate-in slide-in-from-bottom-8 duration-1000 delay-300">
            <h2 className="text-3xl font-bold text-white mb-3 text-center">
              🎉 Profile Created!
            </h2>
            <p className="text-purple-100 mb-8 text-center text-lg">
              Your personalized learning journey begins now
            </p>

            {/* Profile Summary with Creative Layout */}
            <div className="space-y-4">
              <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                <h3 className="font-bold text-white mb-4 flex items-center gap-2">
                  <Brain className="w-5 h-5 text-cyan-400" />
                  Your Learning Profile
                </h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="space-y-3">
                    <div>
                      <span className="text-purple-300 font-medium">Role</span>
                      <p className="text-white">{ROLE_OPTIONS.find(opt => opt.value === profile.role)?.label}</p>
                    </div>
                    <div>
                      <span className="text-purple-300 font-medium">Duration</span>
                      <p className="text-white">{profile.no_of_months} month{profile.no_of_months === '1' ? '' : 's'}</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <span className="text-purple-300 font-medium">Goal</span>
                      <p className="text-white">{GOAL_OPTIONS.find(opt => opt.value === profile.primaryGoal)?.label}</p>
                    </div>
                    <div>
                      <span className="text-purple-300 font-medium">Language</span>
                      <p className="text-white">{profile.language_of_content}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                <h4 className="font-bold text-white mb-3 flex items-center gap-2">
                  <Zap className="w-5 h-5 text-yellow-400" />
                  Tech Stack
                </h4>
                <div className="flex flex-wrap gap-2">
                  {profile.languages.map((lang, index) => (
                    <div key={index} className="bg-gradient-to-r from-indigo-500/20 to-purple-500/20 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 text-sm">
                      <span className="text-white font-medium">{lang.coding_language}</span>
                      <span className="text-purple-200 ml-2">({lang.proficiency})</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <button className="w-full mt-8 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold py-4 px-6 rounded-2xl hover:from-emerald-600 hover:to-teal-700 transition-all duration-300 transform hover:scale-105 shadow-xl">
              Start Learning Journey 🚀
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-72 h-72 bg-purple-500/30 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute top-0 right-1/4 w-72 h-72 bg-yellow-500/30 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-1/3 w-72 h-72 bg-pink-500/30 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-2 h-2 bg-cyan-400 rounded-full animate-ping"></div>
        <div className="absolute top-40 right-20 w-1 h-1 bg-pink-400 rounded-full animate-pulse"></div>
        <div className="absolute bottom-32 left-20 w-3 h-3 bg-yellow-400 rounded-full animate-bounce"></div>
        <div className="absolute bottom-20 right-32 w-2 h-2 bg-emerald-400 rounded-full animate-ping delay-1000"></div>
      </div>

      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <div className="max-w-4xl w-full">
          {/* Header Section */}
          <div className="text-center mb-12 animate-in slide-in-from-top duration-1000">
            <div className="inline-flex items-center gap-3 mb-4">
              <div className="relative">
                <GraduationCap className="w-12 h-12 text-cyan-400" />
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full animate-pulse"></div>
              </div>
              <h1 className="text-5xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                StudyPath
              </h1>
            </div>
            <p className="text-xl text-purple-200 max-w-2xl mx-auto leading-relaxed">
              Craft your personalized learning experience with our intelligent course recommendation system
            </p>
          </div>

          {/* Main Form Card */}
          <div className="bg-white/5 backdrop-blur-2xl rounded-3xl border border-white/10 shadow-2xl overflow-hidden animate-in slide-in-from-bottom duration-1000 delay-300">
            {/* Progress Header */}
            <div className="bg-gradient-to-r from-indigo-600/20 to-purple-600/20 p-8 border-b border-white/10">
              <ProgressIndicator currentStep={getCompletedSections()} totalSteps={4} />
            </div>

            {/* Form Content */}
            <form onSubmit={handleSubmit} className="p-8 space-y-12">
              {/* Section 1: Role - Creative Card Layout */}
              <div className="space-y-6">
                <div className="flex items-center gap-3 text-2xl font-bold text-white">
                  <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center">
                    <Target className="w-6 h-6 text-white" />
                  </div>
                  Who are you?
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {ROLE_OPTIONS.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => setProfile(prev => ({ ...prev, role: option.value }))}
                      className={`p-6 rounded-2xl border-2 transition-all duration-300 transform hover:scale-105 ${
                        profile.role === option.value
                          ? 'bg-gradient-to-br from-cyan-500/20 to-blue-600/20 border-cyan-400 shadow-lg shadow-cyan-500/25'
                          : 'bg-white/5 border-white/20 hover:bg-white/10 hover:border-white/30'
                      }`}
                    >
                      <div className="text-center">
                        <div className={`w-12 h-12 mx-auto mb-3 rounded-xl flex items-center justify-center ${
                          profile.role === option.value ? 'bg-cyan-500' : 'bg-white/10'
                        }`}>
                          <GraduationCap className="w-6 h-6 text-white" />
                        </div>
                        <p className="font-semibold text-white">{option.label}</p>
                      </div>
                    </button>
                  ))}
                </div>
                {errors.role && (
                  <p className="text-red-400 text-sm animate-in slide-in-from-left duration-200">{errors.role}</p>
                )}
              </div>

              {/* Section 2: Goals - Hexagon Layout */}
              <div className="space-y-6">
                <div className="flex items-center gap-3 text-2xl font-bold text-white">
                  <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center">
                    <Rocket className="w-6 h-6 text-white" />
                  </div>
                  What's your mission?
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <FormField label="Primary Goal" required error={errors.primaryGoal}>
                      <div className="space-y-3">
                        {GOAL_OPTIONS.map((option) => (
                          <button
                            key={option.value}
                            type="button"
                            onClick={() => setProfile(prev => ({ ...prev, primaryGoal: option.value }))}
                            className={`w-full p-4 rounded-xl border-2 text-left transition-all duration-300 transform hover:scale-102 ${
                              profile.primaryGoal === option.value
                                ? 'bg-gradient-to-r from-emerald-500/20 to-teal-600/20 border-emerald-400 shadow-lg shadow-emerald-500/25'
                                : 'bg-white/5 border-white/20 hover:bg-white/10 hover:border-white/30'
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                                profile.primaryGoal === option.value ? 'bg-emerald-500' : 'bg-white/10'
                              }`}>
                                <Target className="w-4 h-4 text-white" />
                              </div>
                              <span className="font-medium text-white">{option.label}</span>
                            </div>
                          </button>
                        ))}
                      </div>
                    </FormField>
                  </div>

                  <div className="space-y-4">
                    <FormField label="Study Duration" required error={errors.no_of_months}>
                      <div className="grid grid-cols-2 gap-3">
                        {monthOptions.map((option) => (
                          <button
                            key={option.value}
                            type="button"
                            onClick={() => setProfile(prev => ({ ...prev, no_of_months: option.value }))}
                            className={`p-4 rounded-xl border-2 transition-all duration-300 transform hover:scale-105 ${
                              profile.no_of_months === option.value
                                ? 'bg-gradient-to-br from-purple-500/20 to-pink-600/20 border-purple-400 shadow-lg shadow-purple-500/25'
                                : 'bg-white/5 border-white/20 hover:bg-white/10 hover:border-white/30'
                            }`}
                          >
                            <div className="text-center">
                              <Clock className="w-6 h-6 text-white mx-auto mb-2" />
                              <p className="font-medium text-white text-sm">{option.label}</p>
                            </div>
                          </button>
                        ))}
                      </div>
                    </FormField>
                  </div>
                </div>
              </div>

              {/* Section 3: Language - Floating Input */}
              <div className="space-y-6">
                <div className="flex items-center gap-3 text-2xl font-bold text-white">
                  <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-rose-600 rounded-xl flex items-center justify-center">
                    <Globe className="w-6 h-6 text-white" />
                  </div>
                  Content Language
                </div>
                
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-pink-500/20 to-rose-600/20 rounded-2xl blur-xl"></div>
                  <div className="relative bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
                    <FormField label="Preferred Content Language" required error={errors.language_of_content}>
                      <Input
                        placeholder="e.g., English, Spanish, French, Arabic, Hindi"
                        value={profile.language_of_content}
                        onChange={(e) => setProfile(prev => ({ ...prev, language_of_content: e.target.value }))}
                        error={!!errors.language_of_content}
                        className="bg-white/10 border-white/30 text-white placeholder-purple-200"
                      />
                    </FormField>
                  </div>
                </div>
              </div>

              {/* Section 4: Programming Languages - Creative Grid */}
              <div className="space-y-6">
                <div className="flex items-center gap-3 text-2xl font-bold text-white">
                  <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center">
                    <Code className="w-6 h-6 text-white" />
                  </div>
                  Technical Skills
                </div>
                
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-red-600/20 rounded-2xl blur-xl"></div>
                  <div className="relative bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
                    <LanguageSelector
                      languages={profile.languages}
                      onChange={(languages) => setProfile(prev => ({ ...prev, languages }))}
                      error={errors.languages}
                    />
                  </div>
                </div>
              </div>

              {/* Submit Button - Floating Action */}
              <div className="pt-8">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-violet-600 to-purple-600 rounded-2xl blur-xl opacity-75"></div>
                  <button
                    type="submit"
                    className="relative w-full bg-gradient-to-r from-violet-600 to-purple-600 text-white font-bold py-6 px-8 rounded-2xl hover:from-violet-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-2xl border border-white/20 backdrop-blur-sm"
                  >
                    <span className="flex items-center justify-center gap-3 text-lg">
                      <Sparkles className="w-6 h-6" />
                      Create My Learning Profile
                      <Sparkles className="w-6 h-6" />
                    </span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}