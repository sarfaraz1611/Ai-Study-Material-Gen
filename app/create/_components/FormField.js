import React from "react";

export default function FormField({
  label,
  error,
  required,
  children,
  className = "",
}) {
  return (
    <div className={`space-y-3 ${className}`}>
      <label className="block text-sm font-medium text-gray-700">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      {children}
      {error && (
        <p className="text-sm text-red-400 flex items-center gap-2 animate-in slide-in-from-left-1 duration-200">
          <span className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></span>
          {error}
        </p>
      )}
    </div>
  );
}
