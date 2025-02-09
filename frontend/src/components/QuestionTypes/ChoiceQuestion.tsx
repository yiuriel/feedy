import React from 'react';

interface ChoiceQuestionProps {
  question: string;
  options: string[];
  onChange: (value: string) => void;
  required?: boolean;
}

export const ChoiceQuestion: React.FC<ChoiceQuestionProps> = ({
  question,
  options,
  onChange,
  required = false,
}) => {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700">
        {question} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="mt-2 space-y-2">
        {options.map((option, index) => (
          <div key={index} className="flex items-center">
            <input
              type="radio"
              name={question}
              value={option}
              onChange={(e) => onChange(e.target.value)}
              className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
              required={required}
            />
            <label className="ml-3 block text-sm font-medium text-gray-700">
              {option}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};
