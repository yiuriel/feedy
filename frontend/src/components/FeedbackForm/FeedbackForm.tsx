import { useQuery } from "@tanstack/react-query";
import { FC, useEffect } from "react";
import { queryKeys } from "../../lib/queryKeys";
import { api } from "../../services/api";
import { useFeedbackFormStore } from "../../stores/feedbackFormStore";
import { Loading } from "../Loading";
import { FormQuestion } from "./FeedbackFormQuestion";
import { FeedbackFormStepper } from "./FeedbackFormStepper";

export const FeedbackForm: FC<{ accessToken: string }> = ({ accessToken }) => {
  const { setMaxStep, step } = useFeedbackFormStore();
  const { data, isLoading } = useQuery({
    queryKey: [queryKeys.form.answers, accessToken],
    queryFn: () => api.feedbackForm.getOne(accessToken),
    enabled: !!accessToken,
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
    <div className="min-h-screen bg-indigo-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-8">
        <div className="space-y-6">
          <h1 className="text-4xl font-bold text-center text-indigo-900 mb-2">{data?.title}</h1>
          {data.formSettings?.stepped && (
            <div className="w-full bg-gray-200 rounded-full h-2.5 mb-6">
              <div
                className="bg-indigo-600 h-2.5 rounded-full transition-all duration-300"
                style={{ width: `${(step / data.questions.length) * 100}%` }}
              ></div>
            </div>
          )}
          <div className="space-y-8">
            {data.questions.map((q, index) => {
              return (
                <div
                  key={q.id}
                  className={`transition-all duration-300 ${
                    isStepped && index + 1 !== step ? 'hidden' : 'animate-fadeIn'
                  }`}
                >
                  {isStepped ? (
                    index + 1 === step && <FormQuestion question={q} />
                  ) : (
                    <FormQuestion question={q} />
                  )}
                </div>
              );
            })}
          </div>
          <div className="mt-8">
            <FeedbackFormStepper accessToken={accessToken} />
          </div>
        </div>
      </div>
    </div>
  );
};
