"use client";

import React, { useState, useRef, useEffect } from "react";

interface Option {
  label: string;
  value: string | number;
}

interface MultiSelectProps {
  options: Option[];
  selectedValues: (string | number)[];
  onChange: (selected: (string | number)[]) => void;
  label?: string;
  placeholder?: string;
  required?: boolean;
}

const MultiSelect: React.FC<MultiSelectProps> = ({
  options,
  selectedValues,
  onChange,
  label,
  placeholder = "Select options",
  required,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const removeValue = (valueToRemove: string | number) => {
    onChange(selectedValues.filter(value => value !== valueToRemove));
  };

  const toggleOption = (value: string | number) => {
    const newSelected = selectedValues.includes(value)
      ? selectedValues.filter(v => v !== value)
      : [...selectedValues, value];
    onChange(newSelected);
  };

  const getSelectedLabel = (value: string | number) => {
    return options.find(opt => opt.value === value)?.label || value;
  };

  return (
    <div className="w-full">
      {label && (
        <label className="text-sm text-gray-500">
          {label} {required && "*"}
        </label>
      )}
      <div ref={containerRef} className="relative">
        <div
          className="min-h-[40px] w-full border rounded p-2 cursor-pointer bg-white dark:bg-gray-900 dark:border-gray-700"
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className="flex flex-wrap gap-1">
            {selectedValues.map((value) => (
              <div
                key={String(value)} // Ensure the key is a string
                className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 rounded-md px-2 py-1 flex items-center gap-1 text-sm"
              >
                {getSelectedLabel(value)}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    removeValue(value);
                  }}
                  className="hover:text-blue-600 dark:hover:text-blue-300"
                >
                  ×
                </button>
              </div>
            ))}
            {selectedValues.length === 0 && (
              <span className="text-gray-400 dark:text-gray-500">{placeholder}</span>
            )}
          </div>
        </div>
        
        {isOpen && (
          <div className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-800 border dark:border-gray-700 rounded shadow-lg max-h-60 overflow-auto">
            {options.map((option) => (
              <div
                key={String(option.value)} // Ensure the key is a string and unique
                className={`px-4 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 ${
                  selectedValues.includes(option.value) ? "bg-gray-50 dark:bg-gray-700" : ""
                }`}
                onClick={() => toggleOption(option.value)}
              >
                {option.label}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MultiSelect;