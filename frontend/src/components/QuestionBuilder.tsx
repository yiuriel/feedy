import React, { useState } from 'react';
import { QuestionType } from '../types/question';

interface QuestionBuilderProps {
  onSave: (question: {
    type: QuestionType;
    text: string;
    required: boolean;
    options?: string[];
    minRating?: number;
    maxRating?: number;
  }) => void;
}

export const QuestionBuilder: React.FC<QuestionBuilderProps> = ({ onSave }) => {
  const [type, setType] = useState<QuestionType>(QuestionType.TEXT);
  const [text, setText] = useState('');
  const [required, setRequired] = useState(false);
  const [options, setOptions] = useState<string[]>(['']);
  const [minRating, setMinRating] = useState(1);
  const [maxRating, setMaxRating] = useState(5);

  const handleAddOption = () => {
    setOptions([...options, '']);
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

  const handleSave = () => {
    const questionData = {
      type,
      text,
      required,
      ...(type === QuestionType.CHOICE && { options: options.filter(Boolean) }),
      ...(type === QuestionType.RATING && { minRating, maxRating }),
    };
    onSave(questionData);
    setText('');
    setOptions(['']);
    setRequired(false);
  };

  return (
    <div className="bg-white shadow sm:rounded-lg p-6">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Question Type</label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value as QuestionType)}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          >
            {Object.values(QuestionType).map((qType) => (
              <option key={qType} value={qType}>
                {qType.charAt(0).toUpperCase() + qType.slice(1)}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Question Text</label>
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        {type === QuestionType.CHOICE && (
          <div>
            <label className="block text-sm font-medium text-gray-700">Options</label>
            <div className="space-y-2">
              {options.map((option, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="text"
                    value={option}
                    onChange={(e) => handleOptionChange(index, e.target.value)}
                    placeholder={`Option ${index + 1}`}
                    className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveOption(index)}
                    className="inline-flex items-center p-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={handleAddOption}
                className="mt-2 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Add Option
              </button>
            </div>
          </div>
        )}

        {type === QuestionType.RATING && (
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Min Rating</label>
              <input
                type="number"
                value={minRating}
                onChange={(e) => setMinRating(Number(e.target.value))}
                min={1}
                max={maxRating}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Max Rating</label>
              <input
                type="number"
                value={maxRating}
                onChange={(e) => setMaxRating(Number(e.target.value))}
                min={minRating}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
          </div>
        )}

        <div className="flex items-center">
          <input
            type="checkbox"
            checked={required}
            onChange={(e) => setRequired(e.target.checked)}
            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
          />
          <label className="ml-2 block text-sm text-gray-900">Required</label>
        </div>

        <div className="pt-4">
          <button
            type="button"
            onClick={handleSave}
            disabled={!text.trim()}
            className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-gray-400"
          >
            Add Question
          </button>
        </div>
      </div>
    </div>
  );
};
