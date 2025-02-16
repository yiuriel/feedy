import React, { useCallback, useMemo, useState } from "react";
import { QuestionType } from "../types/question";
import { Input } from "./Input/Input";
import { Select } from "./Select/Select";

interface QuestionBuilderProps {
  onQuestionAdded: (question: {
    type: QuestionType;
    text: string;
    required: boolean;
    options?: string[];
    minRating?: number;
    maxRating?: number;
  }) => void;
}

export const QuestionBuilder: React.FC<QuestionBuilderProps> = ({
  onQuestionAdded,
}) => {
  const [type, setType] = useState<QuestionType>(QuestionType.TEXT);
  const [text, setText] = useState("");
  const [required, setRequired] = useState(false);
  const [options, setOptions] = useState<string[]>([""]);
  const [minRating, setMinRating] = useState(1);
  const [maxRating, setMaxRating] = useState(5);

  const handleAddOption = () => {
    setOptions([...options, ""]);
  };

  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleRemoveOption = (index: number) => {
    const newOptions = options.filter((_, i) => i !== index);
    setOptions(newOptions);
  };

  const hasOptions =
    type === QuestionType.MULTIPLE_CHOICE || type === QuestionType.CHECKBOX;

  const handleAddQuestion = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      const questionData = {
        type,
        text,
        required,
        ...(hasOptions && {
          options: options.filter(Boolean),
        }),
        ...(type === QuestionType.RATING && { minRating, maxRating }),
      };
      onQuestionAdded(questionData);
      setText("");
      setOptions([""]);
      setRequired(false);
    },
    [
      type,
      text,
      required,
      hasOptions,
      options,
      minRating,
      maxRating,
      onQuestionAdded,
    ]
  );

  const cantAddQuestion = useMemo(() => {
    return (
      !text.trim() ||
      (hasOptions && (options.length < 2 || options.some((o) => o === "")))
    );
  }, [text, options, hasOptions]);

  return (
    <div className="bg-white shadow-lg rounded-xl p-6 transition-all duration-200 hover:shadow-xl border border-gray-100">
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
          <div>
            <Select
              label="Question Type"
              value={type}
              onChange={(e) => setType(e.target.value as QuestionType)}
              className="w-full bg-gray-50 border-gray-200 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
            >
              {Object.values(QuestionType).map((qType) => (
                <option key={qType} value={qType}>
                  {qType.charAt(0).toUpperCase() +
                    qType.slice(1).toLowerCase().replace("_", " ")}
                </option>
              ))}
            </Select>
          </div>
          <div className="flex items-center space-x-2">
            <div className="flex-grow">
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={required}
                  onChange={(e) => setRequired(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                <span className="ml-3 text-sm font-medium text-gray-700">
                  Required
                </span>
              </label>
            </div>
          </div>
        </div>

        <div className="relative">
          <Input
            label="Question Text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => {
              e.stopPropagation();
              if (e.key === "Enter" && !cantAddQuestion) {
                handleAddQuestion(e);
              }
            }}
            placeholder="Enter your question"
            className="w-full bg-gray-50 border-gray-200 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        {hasOptions && (
          <div className="space-y-4">
            <label className="block text-sm font-medium text-gray-700">
              Options
            </label>
            <div className="space-y-3">
              {options.map((option, index) => (
                <div key={index} className="flex items-center gap-2 group">
                  <div className="flex-grow">
                    <Input
                      value={option}
                      onChange={(e) =>
                        handleOptionChange(index, e.target.value)
                      }
                      onKeyDown={(e) => {
                        e.stopPropagation();
                        if (e.key === "Enter" && !cantAddQuestion) {
                          handleAddQuestion(e);
                        }
                      }}
                      placeholder={`Option ${index + 1}`}
                      className="w-full bg-gray-50 border-gray-200 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemoveOption(index)}
                    className="p-2 text-gray-400 hover:text-red-500 transition-colors duration-200"
                    title="Remove option"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={handleAddOption}
                className="w-full py-2 px-4 border-2 border-dashed border-gray-300 rounded-lg text-sm text-gray-600 hover:border-indigo-500 hover:text-indigo-500 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                + Add Option
              </button>
            </div>
          </div>
        )}

        {type === QuestionType.RATING && (
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Input
                type="number"
                label="Min Rating"
                value={minRating}
                onChange={(e) => {
                  const newValue = Number(e.target.value);
                  if (newValue > 0 && newValue <= maxRating) {
                    setMinRating(newValue);
                  }
                }}
                min={1}
                max={maxRating}
                className="w-full bg-gray-50 border-gray-200 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div>
              <Input
                type="number"
                label="Max Rating"
                value={maxRating}
                onChange={(e) => {
                  const newValue = Number(e.target.value);
                  if (newValue > minRating && newValue <= 10) {
                    setMaxRating(newValue);
                  }
                }}
                min={minRating + 1}
                max={10}
                className="w-full bg-gray-50 border-gray-200 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          </div>
        )}

        <div className="pt-4">
          <button
            type="button"
            onClick={handleAddQuestion}
            disabled={cantAddQuestion}
            className="w-full inline-flex justify-center items-center py-3 px-4 border border-transparent rounded-lg text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-200"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
                clipRule="evenodd"
              />
            </svg>
            Add Question
          </button>
        </div>
      </div>
    </div>
  );
};
