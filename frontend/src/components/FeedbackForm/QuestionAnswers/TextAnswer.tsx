import React from "react";
import { Textarea } from "../../Textarea/Textarea";

interface TextAnswerProps {
  question: string;
  onChange: (value: string) => void;
  required?: boolean;
  value: string;
}

export const TextAnswer: React.FC<TextAnswerProps> = ({
  question,
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
      <div className="relative">
        <Textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required={required}
          rows={4}
          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-shadow duration-200 resize-none placeholder-gray-400 text-gray-900"
          placeholder="Share your thoughts..."
        />
        <div className="absolute bottom-3 right-3 flex items-center space-x-2 text-sm text-indigo-400">
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
            />
          </svg>
        </div>
      </div>
      {value.length > 0 && (
        <p className="text-sm text-indigo-600 animate-fadeIn">
          Characters:{" "}
          <span className="font-medium text-indigo-700">{value.length}</span>
        </p>
      )}
    </div>
  );
};
