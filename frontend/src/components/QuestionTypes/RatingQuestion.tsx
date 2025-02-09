import React from 'react';

interface RatingQuestionProps {
  question: string;
  onChange: (value: number) => void;
  minRating?: number;
  maxRating?: number;
  required?: boolean;
}

export const RatingQuestion: React.FC<RatingQuestionProps> = ({
  question,
  onChange,
  minRating = 1,
  maxRating = 5,
  required = false,
}) => {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-200">
        {question} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="mt-2 flex gap-4">
        {Array.from({ length: maxRating - minRating + 1 }, (_, i) => i + minRating).map(
          (rating) => (
            <button
              key={rating}
              type="button"
              onClick={() => onChange(rating)}
              className="rounded-full w-10 h-10 flex items-center justify-center border border-gray-700 text-gray-200 bg-gray-800 hover:border-indigo-500 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              {rating}
            </button>
          )
        )}
      </div>
    </div>
  );
};
