import React from 'react';

interface CheckboxAnswerProps {
  question: string;
  options: string[];
  onChange: (values: string[]) => void;
  required?: boolean;
  value: string[];
}

export const CheckboxAnswer: React.FC<CheckboxAnswerProps> = ({
  question,
  options,
  onChange,
  required = false,
  value,
}) => {
  const handleCheckboxChange = (option: string, checked: boolean) => {
    if (checked) {
      onChange([...value, option]);
    } else {
      onChange(value.filter((v) => v !== option));
    }
  };

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
              value.includes(option)
                ? 'border-indigo-500 bg-indigo-50'
                : 'border-gray-200 hover:border-indigo-200 hover:bg-indigo-50/50'
            }`}
          >
            <input
              type="checkbox"
              className="sr-only"
              checked={value.includes(option)}
              onChange={(e) => handleCheckboxChange(option, e.target.checked)}
              required={required && value.length === 0}
            />
            <div className="flex items-center justify-between w-full">
              <span className={`text-base ${
                value.includes(option) ? 'text-indigo-900' : 'text-gray-900'
              }`}>
                {option}
              </span>
              <div className={`w-5 h-5 border-2 rounded transition-colors duration-200 flex items-center justify-center ${
                value.includes(option)
                  ? 'border-indigo-500 bg-indigo-500'
                  : 'border-gray-300'
              }`}>
                {value.includes(option) && (
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
                  </svg>
                )}
              </div>
            </div>
          </label>
        ))}
      </div>
      {value.length > 0 && (
        <p className="text-sm text-indigo-600 animate-fadeIn">
          Selected: <span className="font-medium text-indigo-700">{value.length}</span> option{value.length !== 1 ? 's' : ''}
        </p>
      )}
    </div>
  );
};
