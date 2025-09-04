import React from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../../components/ui/select';

export default function CustomSelect({ options, value, onChange, placeholder = 'Select an option', error, className }) {
  return (
    <div className="w-full">
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger 
          className={`w-full px-4 py-3 bg-white border-2 rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-yellow-400/30 focus:border-yellow-400 text-gray-800 h-auto ${
            error 
              ? 'border-red-500 focus:border-red-500 focus:ring-red-500/30' 
              : 'border-gray-300 hover:border-gray-400'
          } ${className || ''}`}
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent className="bg-white border border-gray-200 rounded-xl shadow-lg">
          {options.map((option) => (
            <SelectItem 
              key={option.value} 
              value={option.value}
              className="text-gray-800 hover:bg-yellow-50 focus:bg-yellow-50 cursor-pointer"
            >
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}