import { useQuery } from "@tanstack/react-query";
import { FC, useEffect, useMemo } from "react";
import { queryKeys } from "../../lib/queryKeys";
import { api } from "../../services/api";
import { Loading } from "../Loading";
import { FormQuestion } from "./FeedbackFormQuestion";
import { useFeedbackFormStore } from "../../stores/feedbackFormStore";
import { Button } from "../Button/Button";

export const FeedbackForm: FC<{ id: string }> = ({ id }) => {
  const { setMaxStep, setStep, step, maxStep, answers } =
    useFeedbackFormStore();
  const { data, isLoading } = useQuery({
    queryKey: [queryKeys.form.answers, id],
    queryFn: () => api.feedbackForm.getOne(id),
    enabled: !!id,
  });

  useEffect(() => {
    if (!data) return;
    setMaxStep(data.questions.length);
  }, [data, setMaxStep]);

  const unansweredQuestions = useMemo(() => {
    return data?.questions.some((q) =>
      Array.isArray(answers[q.id]) ? !answers[q.id].length : !answers[q.id]
    );
  }, [answers, data?.questions]);

  if (isLoading) {
    return <Loading />;
  }

  if (!data) {
    return null;
  }

  return (
    <div className="container mx-auto">
      <h1 className="text-5xl font-bold text-center py-4">{data?.title}</h1>
      {data.questions.map((q, index) => {
        return (
          <div key={q.id}>
            {index + 1 === step && <FormQuestion question={q} />}
          </div>
        );
      })}
      <div className="container mx-auto flex justify-between items-center">
        {step > 1 && step <= maxStep && (
          <Button onClick={() => setStep(step - 1)} disabled={step === 1}>
            Previous
          </Button>
        )}
        {step < maxStep && (
          <>
            <span></span>
            <Button onClick={() => setStep(step + 1)}>Next</Button>
          </>
        )}
        {step === maxStep && (
          <Button disabled={unansweredQuestions}>Submit</Button>
        )}
      </div>
    </div>
  );
};
