import React from 'react';

interface TextQuestionProps {
  question: string;
  onChange: (value: string) => void;
  required?: boolean;
}

export const TextQuestion: React.FC<TextQuestionProps> = ({
  question,
  onChange,
  required = false,
}) => {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700">
        {question} {required && <span className="text-red-500">*</span>}
      </label>
      <textarea
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        rows={3}
        onChange={(e) => onChange(e.target.value)}
        required={required}
      />
    </div>
  );
};
