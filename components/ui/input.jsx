import * as React from "react";

import { cn } from "../../lib/utils";

function Input({ className, type, error, ...props }) {
  return (
    <input
      type={type}
      data-slot="input"
      aria-invalid={error ? "true" : undefined}
      className={cn(
        // Base styles with your custom design
        "h-12 px-4 py-3 bg-white border-2 rounded-xl transition-all duration-200 flex w-full min-w-0 text-base outline-none md:text-sm",
        // Text and placeholder styling
        "text-gray-800 placeholder:text-gray-400",
        // Focus states - your custom yellow theme
        "focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-yellow-400/30 focus-visible:border-yellow-400",
        // Error states
        error
          ? "border-red-400 focus-visible:border-red-400 focus-visible:ring-red-400/30 aria-invalid:border-red-400 aria-invalid:ring-red-400/20"
          : "border-gray-300 hover:border-gray-400",
        // File input styling
        "file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-gray-800 file:inline-flex file:h-7",
        // Disabled states
        "disabled:cursor-not-allowed disabled:opacity-50 disabled:pointer-events-none",
        // Selection styling
        "selection:bg-yellow-400 selection:text-yellow-900",
        className
      )}
      {...props}
    />
  );
}

export { Input };
