import { FC, useCallback, useMemo } from "react";
import { useFeedbackFormStore } from "../../stores/feedbackFormStore";
import { Button } from "../Button/Button";
import { useMutation, useQuery } from "@tanstack/react-query";
import { queryKeys } from "../../lib/queryKeys";
import { api } from "../../services/api";
import {
  FeedbackResponseAnswer,
  FeedbackResponseMetadata,
} from "../../services/api.types";
import { QuestionType } from "../../types/question";

export const FeedbackFormStepper: FC<{ accessToken: string }> = ({
  accessToken,
}) => {
  const { setStep, step, maxStep, answers, resetAnswers } =
    useFeedbackFormStore();

  const { data } = useQuery({
    queryKey: [queryKeys.form.answers, accessToken],
    queryFn: () => api.feedbackForm.getOne(accessToken),
  });

  const { mutateAsync } = useMutation({
    mutationKey: [queryKeys.feedbackResponse.create],
    mutationFn: api.feedbackResponse.create,
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

  const handleFormSubmit = useCallback(async () => {
    const metadata: FeedbackResponseMetadata = {
      userAgent: navigator.userAgent,
    };

    const responseAnswers: FeedbackResponseAnswer[] = (
      data?.questions ?? []
    ).map((q) => {
      return {
        questionId: q.id,
        textAnswer:
          q.type === QuestionType.TEXT ||
          q.type === QuestionType.MULTIPLE_CHOICE
            ? String(answers[q.id])
            : undefined,
        ratingAnswer:
          q.type === QuestionType.RATING ? Number(answers[q.id]) : undefined,
        selectedOptions:
          q.type === QuestionType.CHECKBOX
            ? (answers[q.id] as string[])
            : undefined,
      };
    });

    await mutateAsync({
      formId: accessToken,
      answers: responseAnswers,
      metadata,
    });

    setStep(1);
    resetAnswers();
  }, [
    data?.questions,
    mutateAsync,
    accessToken,
    setStep,
    resetAnswers,
    answers,
  ]);

  if (!data) {
    return null;
  }

  const isStepped = data.formSettings?.stepped;

  if (!isStepped) {
    return (
      <Button
        disabled={unansweredQuestions}
        onClick={handleFormSubmit}
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
            ? 'bg-gray-100 text-gray-400'
            : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
        }`}
      >
        Previous
      </Button>
      {step === maxStep ? (
        <Button
          disabled={isUnanswered(step - 1) && isQuestionRequired(step - 1)}
          onClick={handleFormSubmit}
          className={`flex-1 py-3 rounded-lg transition-all duration-200 ${
            isUnanswered(step - 1) && isQuestionRequired(step - 1)
              ? 'bg-indigo-300 cursor-not-allowed'
              : 'bg-indigo-600 hover:bg-indigo-700 text-white'
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
              ? 'bg-indigo-300 cursor-not-allowed'
              : 'bg-indigo-600 hover:bg-indigo-700 text-white'
          }`}
        >
          Next
        </Button>
      )}
    </div>
  );
};
