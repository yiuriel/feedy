import { FC, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../services/api";
import { FeedbackForm } from "../../services/api.types";
import { queryKeys } from "../../lib/queryKeys";
import { Switch } from "../Switch/Switch";

interface FormEditProps {
  form: FeedbackForm;
  isOpen: boolean;
  onClose: () => void;
}

export const FormEdit: FC<FormEditProps> = ({ form, isOpen, onClose }) => {
  const [title, setTitle] = useState(form.title);
  const [description, setDescription] = useState(form.description || "");
  const [customThankYouPage, setCustomThankYouPage] = useState(
    form.customThankYouPage || ""
  );
  const [settings, setSettings] = useState({
    stepped: form.formSettings?.stepped || false,
    allowMultipleResponses: form.formSettings?.allowMultipleResponses || false,
  });
  const [error, setError] = useState("");

  const queryClient = useQueryClient();

  const { mutate: updateForm, isPending } = useMutation({
    mutationFn: () =>
      api.feedbackForm.update(form.accessToken, {
        title,
        description,
        customThankYouPage: customThankYouPage || undefined,
        settings,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.form.getAll],
      });
      queryClient.invalidateQueries({
        queryKey: [queryKeys.dashboard.stats],
      });
      onClose();
    },
    onError: () => {
      setError("Failed to update form. Please try again.");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    updateForm();
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-gray-500 bg-opacity-75 flex items-center justify-center"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg p-6 max-w-2xl w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium text-gray-900">Edit Form</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <span className="sr-only">Close</span>
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>

          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          <div>
            <label
              htmlFor="thankYouPage"
              className="block text-sm font-medium text-gray-700"
            >
              Custom Thank You Page (optional)
            </label>
            <textarea
              id="thankYouPage"
              value={customThankYouPage}
              onChange={(e) => setCustomThankYouPage(e.target.value)}
              rows={3}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Custom message shown after form submission"
            />
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-medium text-gray-700">
                  Show one question at a time
                </h4>
                <p className="text-sm text-gray-500">
                  Display questions in a stepped format
                </p>
              </div>
              <Switch
                checked={settings.stepped}
                onChange={(enabled) =>
                  setSettings({ ...settings, stepped: enabled })
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-medium text-gray-700">
                  Allow multiple responses
                </h4>
                <p className="text-sm text-gray-500">
                  Let users submit the form multiple times
                </p>
              </div>
              <Switch
                checked={settings.allowMultipleResponses}
                onChange={(enabled) =>
                  setSettings({ ...settings, allowMultipleResponses: enabled })
                }
              />
            </div>
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="inline-flex justify-center py-2 px-4 border-2 border-indigo-300 border-solid shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 hover:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isPending}
              className="inline-flex justify-center py-2 px-4 border-2 border-indigo-300 border-solid shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 hover:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
            >
              {isPending ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
