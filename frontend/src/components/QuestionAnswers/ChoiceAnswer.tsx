import React from 'react';

interface ChoiceAnswerProps {
  question: string;
  options: string[];
  onChange: (value: string) => void;
  required?: boolean;
  value: string;
}

export const ChoiceAnswer: React.FC<ChoiceAnswerProps> = ({
  question,
  options,
  onChange,
  required = false,
  value,
}) => {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {question}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <div className="space-y-2">
        {options.map((option, index) => (
          <label key={index} className="flex items-center">
            <input
              type="radio"
              className="form-radio text-blue-500"
              checked={value === option}
              onChange={() => onChange(option)}
              required={required}
              name={`choice-${question}`}
            />
            <span className="ml-2">{option}</span>
          </label>
        ))}
      </div>
    </div>
  );
};
