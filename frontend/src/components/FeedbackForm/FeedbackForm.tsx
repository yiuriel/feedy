import { useQuery } from "@tanstack/react-query";
import { FC, useEffect } from "react";
import { queryKeys } from "../../lib/queryKeys";
import { api } from "../../services/api";
import { useFeedbackFormStore } from "../../stores/feedbackFormStore";
import { Loading } from "../Loading";
import { FormQuestion } from "./FeedbackFormQuestion";
import { FeedbackFormStepper } from "./FeedbackFormStepper";

export const FeedbackForm: FC<{ id: string }> = ({ id }) => {
  const { setMaxStep, step } = useFeedbackFormStore();
  const { data, isLoading } = useQuery({
    queryKey: [queryKeys.form.answers, id],
    queryFn: () => api.feedbackForm.getOne(id),
    enabled: !!id,
  });

  useEffect(() => {
    if (!data) return;
    setMaxStep(data.questions.length);
  }, [data, setMaxStep]);

  if (isLoading) {
    return <Loading />;
  }

  if (!data) {
    return null;
  }

  const isStepped = data.formSettings?.stepped;

  return (
    <div className="container mx-auto">
      <h1 className="text-5xl font-bold text-center py-4">{data?.title}</h1>
      {data.questions.map((q, index) => {
        return (
          <div key={q.id}>
            {isStepped ? (
              index + 1 === step && <FormQuestion question={q} />
            ) : (
              <FormQuestion question={q} />
            )}
          </div>
        );
      })}
      <FeedbackFormStepper id={id} />
    </div>
  );
};
