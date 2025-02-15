import { useQuery } from "@tanstack/react-query";
import { FC, useMemo } from "react";
import { queryKeys } from "../../lib/queryKeys";
import { api } from "../../services/api";
import { useFeedbackFormStore } from "../../stores/feedbackFormStore";
import { Button } from "../Button/Button";

export const FeedbackFormStepper: FC<{ accessToken: string }> = ({
  accessToken,
}) => {
  const { setStep, step, maxStep, answers } = useFeedbackFormStore();

  const { data } = useQuery({
    queryKey: [queryKeys.form.answers, accessToken],
    queryFn: () => api.feedbackForm.getOne(accessToken),
  });

  const unansweredQuestions = useMemo(() => {
    return data?.questions.some((q) =>
      Array.isArray(answers[q.id]) ? !answers[q.id].length : !answers[q.id]
    );
  }, [answers, data?.questions]);

  const isQuestionRequired = (index: number) => {
    return data?.questions[index].required;
  };

  const isUnanswered = (index: number) => {
    if (!data) return false;

    return Array.isArray(answers[data?.questions[index].id])
      ? !answers[data?.questions[index].id].length
      : !answers[data?.questions[index].id];
  };

  if (!data) {
    return null;
  }

  const isStepped = data.formSettings?.stepped;

  if (!isStepped) {
    return (
      <Button
        disabled={unansweredQuestions}
        type="submit"
        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-lg transition-colors duration-200"
      >
        Submit Feedback
      </Button>
    );
  }

  return (
    <div className="flex justify-between items-center gap-4">
      <Button
        disabled={step === 1}
        onClick={() => setStep(step - 1)}
        className={`flex-1 py-3 rounded-lg transition-all duration-200 ${
          step === 1
            ? "bg-gray-100 text-gray-400"
            : "bg-gray-100 hover:bg-gray-200 text-gray-700"
        }`}
      >
        Previous
      </Button>
      {step === maxStep ? (
        <Button
          disabled={isUnanswered(step - 1) && isQuestionRequired(step - 1)}
          type="submit"
          className={`flex-1 py-3 rounded-lg transition-all duration-200 ${
            isUnanswered(step - 1) && isQuestionRequired(step - 1)
              ? "bg-indigo-300 cursor-not-allowed"
              : "bg-indigo-600 hover:bg-indigo-700 text-white"
          }`}
        >
          Submit Feedback
        </Button>
      ) : (
        <Button
          disabled={isUnanswered(step - 1) && isQuestionRequired(step - 1)}
          onClick={() => setStep(step + 1)}
          className={`flex-1 py-3 rounded-lg transition-all duration-200 ${
            isUnanswered(step - 1) && isQuestionRequired(step - 1)
              ? "bg-indigo-300 cursor-not-allowed"
              : "bg-indigo-600 hover:bg-indigo-700 text-white"
          }`}
        >
          Next
        </Button>
      )}
    </div>
  );
};
