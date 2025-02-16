import React from "react";

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
  const ref = React.useRef<HTMLDivElement>(null);

  const ratings = Array.from(
    { length: maxRating - minRating + 1 },
    (_, i) => i + minRating
  );

  const getColorClass = (rating: number) => {
    const percentage = ((rating - minRating) / (maxRating - minRating)) * 100;
    if (percentage <= 25) return "text-red-500";
    if (percentage <= 50) return "text-yellow-500";
    if (percentage <= 75) return "text-blue-500";
    return "text-green-500";
  };

  return (
    <div className="space-y-4" ref={ref}>
      <label className="block text-lg font-medium text-indigo-900">
        {question}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <div className="flex flex-col space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-indigo-600 flex items-center">
            <svg
              className="w-4 h-4 mr-1 text-indigo-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            Not satisfied
          </span>
          <div className="flex gap-1">
            {ratings.map((rating) => (
              <button
                key={rating}
                type="button"
                onClick={() => onChange(rating)}
                onMouseEnter={() => {
                  if (!ref.current) return;

                  const stars = ref.current.querySelectorAll(".star-rating");
                  stars.forEach((star, index) => {
                    if (index < rating) {
                      star.classList.add("text-purple-400");
                    }
                  });
                }}
                onMouseLeave={() => {
                  if (!ref.current) return;

                  const stars = ref.current.querySelectorAll(".star-rating");
                  stars.forEach((star, index) => {
                    if (index >= (value || 0)) {
                      star.classList.remove("text-purple-400");
                    }
                  });
                }}
                className="p-1 rounded-full transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                aria-label={`Rate ${rating} out of ${maxRating}`}
              >
                <svg
                  className={`w-8 h-8 transition-colors duration-200 star-rating ${
                    rating <= (value || 0) ? "text-purple-400" : "text-gray-300"
                  }`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </button>
            ))}
          </div>
          <span className="text-sm font-medium text-indigo-600 flex items-center">
            Very satisfied
            <svg
              className="w-4 h-4 ml-1 text-indigo-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </span>
        </div>
        {value ? (
          <p className="text-sm text-indigo-600 text-center animate-fadeIn">
            You rated:{" "}
            <span className={`font-medium ${getColorClass(value)}`}>
              {value}
            </span>{" "}
            out of {maxRating}
          </p>
        ) : null}
      </div>
    </div>
  );
};
