import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { FC, FormEvent, useCallback, useEffect, useRef } from "react";
import { queryKeys } from "../../lib/queryKeys";
import { api } from "../../services/api";
import { useFeedbackFormStore } from "../../stores/feedbackFormStore";
import { Loading } from "../Loading";
import { FormQuestion } from "./FeedbackFormQuestion";
import { FeedbackFormStepper } from "./FeedbackFormStepper";
import { HoneyPotField } from "../HoneyPotField/HoneyPotField";
import {
  FeedbackResponseMetadata,
  FeedbackResponseAnswer,
} from "../../services/api.types";
import { QuestionType } from "../../types/question";
import { HONEY_POT_FIELD_NAME } from "../HoneyPotField/HoneyPotField.constants";

export const FeedbackForm: FC<{ accessToken: string }> = ({ accessToken }) => {
  const formRef = useRef<HTMLFormElement>(null);
  const { setMaxStep, step, answers, resetAnswers, setStep } =
    useFeedbackFormStore();

  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: [queryKeys.form.answers, accessToken],
    queryFn: () => api.feedbackForm.getOne(accessToken),
    enabled: !!accessToken,
  });

  const { mutateAsync } = useMutation({
    mutationKey: [queryKeys.feedbackResponse.create],
    mutationFn: api.feedbackResponse.create,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.form.answers, accessToken],
      });
    },
  });

  useEffect(() => {
    if (!data) return;
    setMaxStep(data.questions.length);
  }, [data, setMaxStep]);

  const onSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      if (!formRef.current) return;
      const formData = new FormData(formRef.current);
      const hp_value = formData.get(HONEY_POT_FIELD_NAME)?.toString();

      const hp_answer: FeedbackResponseAnswer = {
        questionId: HONEY_POT_FIELD_NAME,
        textAnswer: hp_value,
      };

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
        answers: [hp_answer, ...responseAnswers],
        metadata,
      });

      setStep(1);
      resetAnswers();
    },
    [data?.questions, mutateAsync, accessToken, resetAnswers, answers, setStep]
  );

  if (isLoading) {
    return <Loading />;
  }

  if (!data) {
    return null;
  }

  const isStepped = data.formSettings?.stepped;

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-8">
        <div className="space-y-6">
          <h1 className="text-4xl font-bold text-center text-indigo-900 mb-2">
            {data?.title}
          </h1>
          {data.formSettings?.stepped && (
            <div className="w-full bg-gray-200 rounded-full h-2.5 mb-6">
              <div
                className="bg-indigo-600 h-2.5 rounded-full transition-all duration-300"
                style={{ width: `${(step / data.questions.length) * 100}%` }}
              ></div>
            </div>
          )}
          <form
            name="feedback-form"
            id="feedback-form"
            onSubmit={onSubmit}
            ref={formRef}
          >
            <div className="space-y-8">
              {data.questions.map((q, index) => {
                return (
                  <div
                    key={q.id}
                    className={`transition-all duration-300 ${
                      isStepped && index + 1 !== step
                        ? "hidden"
                        : "animate-fadeIn"
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
            <HoneyPotField />
          </form>
        </div>
      </div>
    </div>
  );
};
