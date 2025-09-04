import React, { useState } from 'react';
import { Plus, X, Code2 } from 'lucide-react';
import Select from './Select';
import { Input } from "../../../components/ui/input";

export default function LanguageSelector({ languages, onChange, error }) {
  // Define options directly in the component
  const PROFICIENCY_OPTIONS = [
    { value: 'Beginner', label: 'Beginner' },
    { value: 'Intermediate', label: 'Intermediate' },
    { value: 'Advanced', label: 'Advanced' },
    { value: 'Expert', label: 'Expert' }
  ];

  const POPULAR_LANGUAGES = [
    'JavaScript',
    'Python',
    'Java',
    'TypeScript',
    'C++',
    'C#',
    'PHP',
    'Ruby',
    'Go',
    'Rust',
    'Swift',
    'Kotlin',
    'React',
    'Vue.js',
    'Angular',
    'Node.js',
    'Django',
    'Flask',
    'Spring Boot',
    'Laravel'
  ];

  const [showCustomInput, setShowCustomInput] = useState(false);
  const [customLanguage, setCustomLanguage] = useState('');

  const addLanguage = (language) => {
    if (!language.trim()) return;
    
    const exists = languages.some(lang => 
      lang.coding_language.toLowerCase() === language.toLowerCase()
    );
    
    if (exists) return;

    const newLanguage = {
      coding_language: language,
      proficiency: 'Beginner'
    };

    onChange([...languages, newLanguage]);
    setCustomLanguage('');
    setShowCustomInput(false);
  };

  const removeLanguage = (index) => {
    onChange(languages.filter((_, i) => i !== index));
  };

  const updateProficiency = (index, proficiency) => {
    const updated = languages.map((lang, i) => 
      i === index ? { ...lang, proficiency } : lang
    );
    onChange(updated);
  };

  const availableLanguages = POPULAR_LANGUAGES.filter(lang => 
    !languages.some(userLang => userLang.coding_language === lang)
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <span className="text-gray-700 font-medium">Programming Languages</span>
        <span className="text-red-500">*</span>
      </div>
      <div className="space-y-4">
        {/* Selected Languages */}
        {languages.map((lang, index) => (
          <div key={index} className="flex gap-3 p-4 bg-gray-50 rounded-xl border border-gray-200">
            <div className="flex-1 my-auto">
              <p className="font-medium text-gray-800">{lang.coding_language}</p>
            </div>
            <div className="w-32">
              <Select
                options={PROFICIENCY_OPTIONS}
                value={lang.proficiency}
                onChange={(value) => updateProficiency(index, value)}
                placeholder="Proficiency"
              />
            </div>
            <button
              type="button"
              onClick={() => removeLanguage(index)}
              className="p-2 text-red-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}

        {/* Add Language Section */}
        <div className="space-y-3">
          {/* Popular Languages */}
          {availableLanguages.length > 0 && (
            <div>
              <p className="text-sm font-medium text-gray-600 mb-3">Quick Add:</p>
              <div className="flex flex-wrap gap-2">
                {availableLanguages.slice(0, 6).map((lang) => (
                  <button
                    key={lang}
                    type="button"
                    onClick={() => addLanguage(lang)}
                    className="px-4 py-2 text-sm bg-white text-gray-700 rounded-full hover:bg-yellow-50 hover:text-gray-800 transition-all duration-200 border border-gray-300 hover:border-yellow-300 transform hover:scale-105 shadow-sm"
                  >
                    {lang}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Custom Language Input */}
          {showCustomInput ? (
            <div className="flex gap-3">
              <Input
                placeholder="Enter programming language"
                value={customLanguage}
                onChange={(e) => setCustomLanguage(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    addLanguage(customLanguage);
                  }
                }}
              />
              <button
                type="button"
                onClick={() => addLanguage(customLanguage)}
                className="px-6 py-3 bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-800 rounded-xl hover:from-yellow-500 hover:to-yellow-600 transition-all duration-200 transform hover:scale-105 font-medium"
              >
                Add
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowCustomInput(false);
                  setCustomLanguage('');
                }}
                className="px-6 py-3 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-xl transition-colors duration-200"
              >
                Cancel
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setShowCustomInput(true)}
              className="flex items-center gap-2 px-6 py-4 text-gray-600 hover:text-gray-800 hover:bg-gray-50 rounded-xl transition-all duration-200 border-2 border-dashed border-gray-300 hover:border-gray-400 w-full justify-center transform hover:scale-102"
            >
              <Plus className="w-4 h-4" />
              Add Custom Language
            </button>
          )}
        </div>
      </div>
      {error && (
        <p className="text-red-500 text-sm animate-in slide-in-from-left duration-200 flex items-center gap-2">
          <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
          {error}
        </p>
      )}
    </div>
  );
}