import { FC, useMemo } from "react";
import { useFeedbackFormStore } from "../../stores/feedbackFormStore";
import { Button } from "../Button/Button";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../../lib/queryKeys";
import { api } from "../../services/api";

export const FeedbackFormStepper: FC<{ id: string }> = ({ id }) => {
  const { setStep, step, maxStep, answers } = useFeedbackFormStore();

  const { data } = useQuery({
    queryKey: [queryKeys.form.answers, id],
    queryFn: () => api.feedbackForm.getOne(id),
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
        <Button disabled={unansweredQuestions}>Submit</Button>
      )}
    </div>
  );
};
