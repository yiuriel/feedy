import { FC } from "react";
import { FeedbackFormQuestion } from "../../services/api.types";
import { MultipleChoiceAnswer } from "../QuestionAnswers/MultipleChoiceAnswer";
import { RatingAnswer } from "../QuestionAnswers/RatingAnswer";
import { TextAnswer } from "../QuestionAnswers/TextAnswer";
import { CheckboxAnswer } from "../QuestionAnswers/CheckboxAnswer";
import { useFeedbackFormStore } from "../../stores/feedbackFormStore";

export const FormQuestion: FC<{ question: FeedbackFormQuestion }> = ({
  question,
}) => {
  const questionType = question.type;

  const { answers, setAnswer } = useFeedbackFormStore();
  const value = answers[question.id] || "";

  const handleAnswerChange = (value: string | number | string[]) => {
    const parsedValue = typeof value === "number" ? String(value) : value;

    setAnswer(question.id, parsedValue);
  };

  if (questionType === "text") {
    return (
      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
        <TextAnswer
          question={question.question}
          onChange={handleAnswerChange}
          required={question.required}
          value={String(value)}
        />
      </div>
    );
  } else if (questionType === "rating") {
    return (
      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
        <RatingAnswer
          question={question.question}
          onChange={handleAnswerChange}
          minRating={question.minRating}
          maxRating={question.maxRating}
          required={question.required}
          value={Number(value)}
        />
      </div>
    );
  } else if (questionType === "multiple_choice" && question.options) {
    return (
      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
        <MultipleChoiceAnswer
          question={question.question}
          options={question.options}
          onChange={handleAnswerChange}
          required={question.required}
          value={String(value)}
        />
      </div>
    );
  } else if (questionType === "checkbox" && question.options) {
    return (
      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
        <CheckboxAnswer
          question={question.question}
          options={question.options}
          onChange={handleAnswerChange}
          required={question.required}
          value={
            typeof value === "string" ? (value ? value.split(",") : []) : value
          }
        />
      </div>
    );
  }

  return null;
};
