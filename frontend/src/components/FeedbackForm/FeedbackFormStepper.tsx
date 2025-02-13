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

export const FeedbackFormStepper: FC<{ id: string }> = ({ id }) => {
  const { setStep, step, maxStep, answers, resetAnswers } =
    useFeedbackFormStore();

  const { data } = useQuery({
    queryKey: [queryKeys.form.answers, id],
    queryFn: () => api.feedbackForm.getOne(id),
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
      formId: id,
      answers: responseAnswers,
      metadata,
    });

    setStep(1);
    resetAnswers();
  }, [data?.questions, mutateAsync, id, setStep, resetAnswers, answers]);

  if (!data) {
    return null;
  }

  const isStepped = data.formSettings?.stepped;

  if (!isStepped) {
    return (
      <Button disabled={unansweredQuestions} onClick={handleFormSubmit}>
        Submit
      </Button>
    );
  }

  return (
    <div className="container mx-auto flex justify-between items-center">
      {step > 1 && step <= maxStep && (
        <Button onClick={() => setStep(step - 1)} disabled={step === 1}>
          Previous
        </Button>
      )}
      {step < maxStep && (
        <>
          <span></span>
          <Button
            onClick={() => setStep(step + 1)}
            disabled={isQuestionRequired(step - 1) && isUnanswered(step - 1)}
          >
            Next
          </Button>
        </>
      )}
      {step === maxStep && (
        <Button disabled={unansweredQuestions} onClick={handleFormSubmit}>
          Submit
        </Button>
      )}
    </div>
  );
};
