import { FC } from "react";
import { FeedbackFormQuestion } from "../../services/api.types";
import { MultipleChoiceAnswer } from "../QuestionAnswers/MultipleChoiceAnswer";
import { RatingAnswer } from "../QuestionAnswers/RatingAnswer";
import { TextAnswer } from "../QuestionAnswers/TextAnswer";

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
  } else if (
    (questionType === "multiple_choice" || questionType === "checkbox") &&
    question.options
  ) {
    return (
      <MultipleChoiceAnswer
        question={question.question}
        options={question.options}
        onChange={() => {}}
        required={question.required}
      />
    );
  }

  return <div>FeedbackFormQuestion</div>;
};
