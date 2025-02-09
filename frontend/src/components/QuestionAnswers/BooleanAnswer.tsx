import React from 'react';

interface BooleanAnswerProps {
  question: string;
  onChange: (value: boolean) => void;
  required?: boolean;
  value: boolean | null;
}

export const BooleanAnswer: React.FC<BooleanAnswerProps> = ({
  question,
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
      <div className="flex gap-4">
        <label className="inline-flex items-center">
          <input
            type="radio"
            className="form-radio text-blue-500"
            checked={value === true}
            onChange={() => onChange(true)}
            required={required}
            name={`boolean-${question}`}
          />
          <span className="ml-2">Yes</span>
        </label>
        <label className="inline-flex items-center">
          <input
            type="radio"
            className="form-radio text-blue-500"
            checked={value === false}
            onChange={() => onChange(false)}
            required={required}
            name={`boolean-${question}`}
          />
          <span className="ml-2">No</span>
        </label>
      </div>
    </div>
  );
};
