import React from 'react';

interface MultipleChoiceAnswerProps {
  question: string;
  options: string[];
  onChange: (value: string) => void;
  required?: boolean;
  value: string;
}

export const MultipleChoiceAnswer: React.FC<MultipleChoiceAnswerProps> = ({
  question,
  options,
  onChange,
  required = false,
  value,
}) => {
  return (
    <div className="space-y-4">
      <label className="block text-lg font-medium text-indigo-900">
        {question}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <div className="grid gap-3">
        {options.map((option, index) => (
          <label
            key={index}
            className={`relative flex items-center p-4 cursor-pointer rounded-lg border-2 transition-all duration-200 ${
              value === option
                ? 'border-indigo-500 bg-indigo-50'
                : 'border-gray-200 hover:border-indigo-200 hover:bg-indigo-50/50'
            }`}
          >
            <input
              type="radio"
              className="sr-only"
              checked={value === option}
              onChange={() => onChange(option)}
              required={required}
              name={`choice-${question}`}
            />
            <div className="flex items-center justify-between w-full">
              <span className={`text-base ${
                value === option ? 'text-indigo-900' : 'text-gray-900'
              }`}>
                {option}
              </span>
              <div className={`w-5 h-5 border-2 rounded-full flex items-center justify-center transition-colors duration-200 ${
                value === option
                  ? 'border-indigo-500 bg-indigo-500'
                  : 'border-gray-300'
              }`}>
                {value === option && (
                  <div className="w-2 h-2 bg-white rounded-full" />
                )}
              </div>
            </div>
          </label>
        ))}
      </div>
      {value && (
        <p className="text-sm text-indigo-600 animate-fadeIn">
          Selected: <span className="font-medium text-indigo-700">{value}</span>
        </p>
      )}
    </div>
  );
};
