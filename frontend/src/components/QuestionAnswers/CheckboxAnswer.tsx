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
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {question}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <div className="space-y-2">
        {options.map((option, index) => (
          <label key={index} className="flex items-center">
            <input
              type="checkbox"
              className="form-checkbox text-blue-500"
              checked={value.includes(option)}
              onChange={(e) => handleCheckboxChange(option, e.target.checked)}
              required={required && value.length === 0}
            />
            <span className="ml-2">{option}</span>
          </label>
        ))}
      </div>
    </div>
  );
};
