import { FC, useEffect, useRef, useState } from "react";
import { api } from "../../services/api";
import { queryKeys } from "../../lib/queryKeys";
import { Loading } from "../Loading";
import { FeedbackForm } from "./FeedbackForm";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Input } from "../Input/Input";
import { Button } from "../Button/Button";
import { AxiosError } from "axios";

export const FeedbackFormPasswordCheck: FC<{ accessToken: string }> = ({
  accessToken,
}) => {
  const ref = useRef<HTMLInputElement>(null);
  const [isValidPassword, setIsValidPassword] = useState(false);
  const [isLoadingPassword, setIsLoadingPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { data: needsPassword = true, isLoading } = useQuery({
    queryKey: [queryKeys.form.password, accessToken],
    queryFn: () => api.feedbackForm.needsPassword(accessToken),
    enabled: !!accessToken,
  });

  const { mutateAsync } = useMutation({
    mutationKey: [queryKeys.form.checkPassword, accessToken],
    mutationFn: ({ password }: { password: string }) =>
      api.feedbackForm.checkPassword(accessToken, password),
    onMutate: () => {
      setIsLoadingPassword(true);
      setError(null);
    },
    onError: (error: AxiosError<{ message: string }>) => {
      setError(error.response?.data?.message || "Failed to validate password");
      setIsLoadingPassword(false);
    },
    onSuccess: () => {
      setIsLoadingPassword(false);
      setIsValidPassword(true);
    },
  });

  const onSubmit = async (password: string) => {
    setError(null);
    const data = await mutateAsync({ password });
    setIsValidPassword(data);
  };

  useEffect(() => {
    if (needsPassword) return;

    // doesn't need password
    setIsValidPassword(!needsPassword);
  }, [needsPassword]);

  if (isLoading) {
    return <Loading />;
  }

  if (isValidPassword) {
    return <FeedbackForm accessToken={accessToken} />;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
        <div>
          <h1 className="text-3xl font-bold text-center text-indigo-900">
            Password Required
          </h1>
          <p className="mt-3 text-center text-gray-600">
            Please enter the password to access the feedback form
          </p>
        </div>
        <form
          className="mt-8 space-y-6"
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit(ref.current?.value || "");
          }}
        >
          <div className="rounded-md shadow-sm -space-y-px">
            <div className="relative">
              <Input
                type="password"
                placeholder="Enter password"
                ref={ref}
                className={`appearance-none relative block w-full px-4 py-3 border ${
                  error ? "border-red-300" : "border-gray-300"
                } placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 ${
                  error ? "focus:ring-red-500" : "focus:ring-indigo-500"
                } focus:border-transparent transition-colors duration-200`}
                required
                autoFocus
                onChange={() => error && setError(null)}
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <svg
                  className={`h-5 w-5 ${
                    error ? "text-red-400" : "text-indigo-400"
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
            </div>
          </div>

          {error && (
            <div className="rounded-md bg-red-50 p-4 animate-fadeIn">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg
                    className="h-5 w-5 text-red-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              </div>
            </div>
          )}

          <Button
            type="submit"
            className={`group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white ${
              isLoadingPassword
                ? "bg-indigo-400 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-700"
            } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200`}
            disabled={isLoadingPassword}
          >
            <span className="absolute left-0 inset-y-0 flex items-center pl-3">
              {isLoadingPassword ? (
                <svg
                  className="animate-spin h-5 w-5 text-indigo-300"
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
              ) : (
                <svg
                  className="h-5 w-5 text-indigo-300 group-hover:text-indigo-200"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              )}
            </span>
            {isLoadingPassword ? "Validating..." : "Continue"}
          </Button>
        </form>
      </div>
    </div>
  );
};
