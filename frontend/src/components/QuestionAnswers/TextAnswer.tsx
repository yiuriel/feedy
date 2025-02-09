import React from "react";
import { Textarea } from "../Textarea/Textarea";

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
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {question}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <Textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        rows={3}
      />
    </div>
  );
};
