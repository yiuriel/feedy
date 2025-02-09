import { FC } from "react";
import { FeedbackFormQuestion } from "../../services/api.types";
import { MultipleChoiceAnswer } from "../QuestionAnswers/MultipleChoiceAnswer";
import { RatingAnswer } from "../QuestionAnswers/RatingAnswer";
import { TextAnswer } from "../QuestionAnswers/TextAnswer";
import { CheckboxAnswer } from "../QuestionAnswers/CheckboxAnswer";

export const FormQuestion: FC<{ question: FeedbackFormQuestion }> = ({
  question,
}) => {
  const questionType = question.type;

  if (questionType === "text") {
    return (
      <TextAnswer
        question={question.question}
        onChange={() => {}}
        required={question.required}
      />
    );
  } else if (questionType === "rating") {
    return (
      <RatingAnswer
        question={question.question}
        onChange={() => {}}
        minRating={question.minRating}
        maxRating={question.maxRating}
        required={question.required}
      />
    );
  } else if (questionType === "multiple_choice" && question.options) {
    return (
      <MultipleChoiceAnswer
        question={question.question}
        options={question.options}
        onChange={() => {}}
        required={question.required}
      />
    );
  } else if (questionType === "checkbox" && question.options) {
    return (
      <CheckboxAnswer
        question={question.question}
        options={question.options}
        onChange={() => {}}
        required={question.required}
        value={[]}
      />
    );
  }

  return <div>FeedbackFormQuestion</div>;
};
