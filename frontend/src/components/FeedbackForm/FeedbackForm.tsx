import { useQuery } from "@tanstack/react-query";
import { FC } from "react";
import { queryKeys } from "../../lib/queryKeys";
import { api } from "../../services/api";
import { Loading } from "../Loading";
import { FormQuestion } from "./FeedbackFormQuestion";

export const FeedbackForm: FC<{ id: string }> = ({ id }) => {
  const { data, isLoading } = useQuery({
    queryKey: [queryKeys.form.answers, id],
    queryFn: () => api.feedbackForm.getOne(id),
    enabled: !!id,
  });

  if (isLoading) {
    return <Loading />;
  }

  if (!data) {
    return null;
  }

  return (
    <div className="container mx-auto">
      <h1 className="text-5xl font-bold text-center my-4">{data?.title}</h1>
      {data.questions.map((q) => {
        return (
          <div key={q.id}>
            <FormQuestion question={q} />
          </div>
        );
      })}
    </div>
  );
};
