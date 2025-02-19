import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Input } from "../../components/Input/Input";
import { QuestionBuilder } from "../../components/QuestionBuilder";
import { Textarea } from "../../components/Textarea/Textarea";
import { queryKeys } from "../../lib/queryKeys";
import { api } from "../../services/api";
import { CreateFeedbackFormQuestion } from "../../services/api.types";
import {
  FeedbackFormQuestionState,
  FeedbackFormState,
  QuestionType,
} from "../../types/question";
import { Switch } from "../../components/Switch/Switch";

export const CreateFeedbackForm: React.FC = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [form, setForm] = useState<FeedbackFormState>({
    title: "",
    description: "",
    questions: [],
    password: "",
    customThankYouPage: "",
    settings: {
      stepped: false,
      allowMultipleResponses: false,
    },
  });

  const {
    mutate: createForm,
    error,
    isPending,
  } = useMutation({
    mutationFn: api.feedbackForm.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKeys.dashboard.stats] });
      queryClient.invalidateQueries({ queryKey: [queryKeys.form.getAll] });
      navigate("/app/dashboard");
    },
  });

  const handleAddQuestion = (question: FeedbackFormQuestionState) => {
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

    const formattedQuestions = form.questions.map<CreateFeedbackFormQuestion>(
      (q) => ({
        type: q.type.toLowerCase() as CreateFeedbackFormQuestion["type"],
        question: q.text,
        required: q.required,
        options:
          q.type === QuestionType.MULTIPLE_CHOICE ||
          q.type === QuestionType.CHECKBOX
            ? q.options
            : undefined,
        minRating: q.type === QuestionType.RATING ? q.minRating : undefined,
        maxRating: q.type === QuestionType.RATING ? q.maxRating : undefined,
      })
    );

    createForm({
      title: form.title,
      description: form.description,
      questions: formattedQuestions,
      password: form.password,
      customThankYouPage: form.customThankYouPage,
      settings: {
        allowMultipleResponses: form.settings?.allowMultipleResponses,
        stepped: form.settings?.stepped,
      },
    });
  };

  return (
    <div className="container mx-auto py-8">
      <header className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Create Feedback Form
        </h1>
        <p className="text-gray-600">
          Design your feedback form to gather insights from your users
        </p>
      </header>

      <div className="space-y-8 pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form Settings Panel */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white shadow-lg rounded-xl p-6 space-y-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Form Settings
              </h2>

              <div className="space-y-4">
                <Input
                  id="title"
                  name="title"
                  type="text"
                  required
                  value={form.title}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, title: e.target.value }))
                  }
                  label="Form Title"
                  error={error?.message}
                  className="w-full bg-gray-50 border-gray-200 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                />

                <Input
                  id="password"
                  name="password"
                  type="text"
                  value={form.password}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, password: e.target.value }))
                  }
                  label="Password (Optional)"
                  error={error?.message}
                  className="w-full bg-gray-50 border-gray-200 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                />

                <Input
                  id="customThankYouPage"
                  name="customThankYouPage"
                  type="text"
                  value={form.customThankYouPage}
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      customThankYouPage: e.target.value,
                    }))
                  }
                  label="Custom Thank You Page URL (Optional)"
                  error={error?.message}
                  className="w-full bg-gray-50 border-gray-200 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                />

                <Textarea
                  label="Description (Optional)"
                  id="description"
                  value={form.description}
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                  className="w-full bg-gray-50 border-gray-200 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Provide a description for your feedback form"
                />

                <div className="pt-4 space-y-4">
                  <div className="flex items-center justify-between">
                    <label className="block text-sm font-medium text-gray-700">
                      Allow Multiple Responses
                      <p className="text-xs text-gray-500 mt-1">
                        If enabled, users can submit the form multiple times
                      </p>
                    </label>
                    <Switch
                      id="allowMultipleResponses"
                      checked={Boolean(form.settings?.allowMultipleResponses)}
                      onChange={(checked) =>
                        setForm((prev) => ({
                          ...prev,
                          settings: {
                            ...prev.settings,
                            allowMultipleResponses: checked,
                          },
                        }))
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <label className="block text-sm font-medium text-gray-700">
                      Stepped Form
                      <p className="text-xs text-gray-500 mt-1">
                        Show one question at a time to users
                      </p>
                    </label>
                    <Switch
                      id="stepped"
                      checked={Boolean(form.settings?.stepped)}
                      onChange={(checked) =>
                        setForm((prev) => ({
                          ...prev,
                          settings: {
                            ...prev.settings,
                            stepped: checked,
                          },
                        }))
                      }
                    />
                  </div>
                </div>
              </div>
              <button
                onClick={handleSubmit}
                disabled={isPending || form.questions.length === 0}
                className="w-full  mx-auto flex justify-center items-center py-3 px-4 border border-transparent rounded-lg text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-200"
              >
                {isPending ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Creating Form...
                  </>
                ) : (
                  <>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-2"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Create Form
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Questions Panel */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white shadow-lg rounded-xl p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-900">
                  Questions
                </h2>
                <span className="text-sm text-gray-500">
                  {form.questions.length} questions
                </span>
              </div>

              <div className="space-y-6">
                <div className="grid lg:grid-cols-2 gap-6">
                  {form.questions.map((question, index) => (
                    <div
                      key={index}
                      className="relative bg-gray-50 rounded-lg p-4 border border-gray-200 group"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800 mb-2">
                            {question.type.charAt(0).toUpperCase() +
                              question.type
                                .slice(1)
                                .toLowerCase()
                                .replace("_", " ")}
                          </span>
                          <h3 className="text-gray-900 font-medium">
                            {question.text}
                          </h3>
                          {question.required && (
                            <span className="text-xs text-red-600 mt-1">
                              Required
                            </span>
                          )}
                        </div>
                        <button
                          type="button"
                          onClick={() => handleRemoveQuestion(index)}
                          className="text-gray-400 hover:text-red-500 transition-colors duration-200"
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
                      {(question.type === QuestionType.MULTIPLE_CHOICE ||
                        question.type === QuestionType.CHECKBOX) && (
                        <div className="mt-2 space-y-1">
                          {question.options?.map((option, optionIndex) => (
                            <div
                              key={optionIndex}
                              className="flex items-center space-x-2"
                            >
                              <div
                                className={`w-4 h-4 rounded-${
                                  question.type === QuestionType.CHECKBOX
                                    ? "sm"
                                    : "full"
                                } border border-gray-300`}
                              />
                              <span className="text-sm text-gray-600">
                                {option}
                              </span>
                            </div>
                          ))}
                        </div>
                      )}
                      {question.type === QuestionType.RATING && (
                        <div className="mt-2 text-sm text-gray-600">
                          Rating scale: {question.minRating} to{" "}
                          {question.maxRating}
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                <QuestionBuilder onQuestionAdded={handleAddQuestion} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
