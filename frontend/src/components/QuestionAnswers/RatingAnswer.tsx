import React from 'react';

interface RatingAnswerProps {
  question: string;
  onChange: (value: number) => void;
  required?: boolean;
  value: number | null;
  minRating?: number;
  maxRating?: number;
}

export const RatingAnswer: React.FC<RatingAnswerProps> = ({
  question,
  onChange,
  required = false,
  value,
  minRating = 1,
  maxRating = 5,
}) => {
  const ratings = Array.from(
    { length: maxRating - minRating + 1 },
    (_, i) => i + minRating
  );

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {question}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <div className="flex gap-4 items-center">
        {ratings.map((rating) => (
          <label
            key={rating}
            className="flex flex-col items-center cursor-pointer"
          >
            <input
              type="radio"
              className="form-radio text-blue-500 h-6 w-6"
              checked={value === rating}
              onChange={() => onChange(rating)}
              required={required}
              name={`rating-${question}`}
            />
            <span className="mt-1 text-sm">{rating}</span>
          </label>
        ))}
      </div>
      <div className="flex justify-between mt-1 text-sm text-gray-500">
        <span>Not satisfied</span>
        <span>Very satisfied</span>
      </div>
    </div>
  );
};
