import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Input } from "../components/Input/Input";
import { QuestionBuilder } from "../components/QuestionBuilder";
import { Textarea } from "../components/Textarea/Textarea";
import { queryKeys } from "../lib/queryKeys";
import { api } from "../services/api";
import { CreateFeedbackFormQuestion } from "../services/api.types";
import {
  FeedbackFormQuestionState,
  FeedbackFormState,
  QuestionType,
} from "../types/question";
import { Switch } from "../components/Switch/Switch";

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
                label="Custom Thank You Page (Optional)"
                error={error?.message}
              />

              <div className="flex items-center justify-between">
                <label
                  htmlFor="allowMultipleResponses"
                  className="block text-sm font-medium text-gray-700"
                >
                  Allow multiple responses
                  <p className="text-xs text-gray-500">
                    If enabled, users can submit the form multiple times.
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
                <label
                  htmlFor="stepped"
                  className="block text-sm font-medium text-gray-700 pr-2"
                >
                  Make form Stepped
                  <p className="text-xs text-gray-500">
                    If enabled, users will see one question at a time.
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

              <div>
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
                  rows={3}
                />
              </div>
            </div>
          </div>

          <div className="sm:rounded-lg md:col-span-2">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <div className="col-span-2">
                <QuestionBuilder onSave={handleAddQuestion} />
              </div>

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
                      className="text-red-600 hover:bg-red-50 border border-red-600 rounded-md border-solid px-1"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center md:col-start-2 md:col-span-1">
            <button
              type="submit"
              disabled={!form.title || form.questions.length === 0 || isPending}
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-gray-400"
            >
              {isPending ? "Creating..." : "Create Form"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
