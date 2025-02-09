import React from 'react';

interface BooleanQuestionProps {
  question: string;
  onChange: (value: boolean) => void;
  required?: boolean;
}

export const BooleanQuestion: React.FC<BooleanQuestionProps> = ({
  question,
  onChange,
  required = false,
}) => {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-200">
        {question} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="mt-2 space-x-4">
        <button
          type="button"
          onClick={() => onChange(true)}
          className="inline-flex items-center px-4 py-2 border border-gray-700 shadow-sm text-sm font-medium rounded-md text-gray-200 bg-gray-800 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Yes
        </button>
        <button
          type="button"
          onClick={() => onChange(false)}
          className="inline-flex items-center px-4 py-2 border border-gray-700 shadow-sm text-sm font-medium rounded-md text-gray-200 bg-gray-800 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          No
        </button>
      </div>
    </div>
  );
};
