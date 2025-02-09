import React, { useState } from "react";
import { useNavigate } from "react-router";
import { QuestionBuilder } from "../components/QuestionBuilder";
import { Question, FeedbackForm } from "../types/question";

export const CreateFeedbackForm: React.FC = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState<FeedbackForm>({
    title: "",
    description: "",
    questions: [],
  });

  const handleAddQuestion = (question: Question) => {
    setForm((prev) => ({
      ...prev,
      questions: [...prev.questions, question],
    }));
  };

  const handleRemoveQuestion = (index: number) => {
    setForm((prev) => ({
      ...prev,
      questions: prev.questions.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // TODO: Add API call to save the form
      navigate("/app/dashboard");
    } catch (error) {
      console.error("Error creating feedback form:", error);
    }
  };

  return (
    <div className="container mx-auto py-6">
      <div className="px-4 py-6 sm:px-0">
        <header className="flex justify-center mb-4">
          <h1 className="text-2xl font-semibold text-gray-900">
            Create Feedback Form
          </h1>
        </header>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          <div className="bg-white shadow sm:rounded-lg p-6 md:col-span-1">
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-700"
                >
                  Form Title
                </label>
                <input
                  type="text"
                  id="title"
                  value={form.title}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, title: e.target.value }))
                  }
                  required
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>

              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700"
                >
                  Description (Optional)
                </label>
                <textarea
                  id="description"
                  value={form.description}
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                  rows={3}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>
          </div>

          <div className="bg-white shadow sm:rounded-lg p-6 md:col-span-2">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {form.questions.map((question, index) => (
                <div key={index} className="bg-white shadow sm:rounded-lg p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">
                        Question {index + 1}
                      </h3>
                      <p className="mt-1 text-sm text-gray-500">
                        {question.text}
                      </p>
                      <p className="mt-1 text-sm text-gray-500">
                        Type: {question.type}
                      </p>
                      {question.options && (
                        <div className="mt-2">
                          <p className="text-sm text-gray-500">Options:</p>
                          <ul className="list-disc pl-5">
                            {question.options.map((option, i) => (
                              <li key={i} className="text-sm text-gray-500">
                                {option}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemoveQuestion(index)}
                      className="text-red-600 hover:text-red-800"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}

              <QuestionBuilder onSave={handleAddQuestion} />
            </div>
          </div>

          <div className="flex justify-end md:col-start-2 md:col-span-1">
            <button
              type="submit"
              disabled={!form.title || form.questions.length === 0}
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-gray-400"
            >
              Create Form
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
