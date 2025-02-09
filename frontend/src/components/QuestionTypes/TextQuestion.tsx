import React from 'react';
import { Input } from '../Input/Input';

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
      <Input
        type="text"
        label={question}
        required={required}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Enter your answer"
      />
    </div>
  );
};
