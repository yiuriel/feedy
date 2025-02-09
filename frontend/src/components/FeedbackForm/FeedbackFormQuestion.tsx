import { FC } from "react";
import { FeedbackFormQuestion } from "../../services/api.types";
import { TextQuestion } from "../QuestionTypes/TextQuestion";
import { RatingQuestion } from "../QuestionTypes/RatingQuestion";
import { ChoiceQuestion } from "../QuestionTypes/ChoiceQuestion";
import { BooleanQuestion } from "../QuestionTypes/BooleanQuestion";

export const FormQuestion: FC<{ question: FeedbackFormQuestion }> = ({
  question,
}) => {
  const questionType = question.type;

  if (questionType === "text") {
    return (
      <TextQuestion
        question={question.question}
        onChange={() => {}}
        required={question.required}
      />
    );
  } else if (questionType === "rating") {
    return (
      <RatingQuestion
        question={question.question}
        onChange={() => {}}
        minRating={question.minRating}
        maxRating={question.maxRating}
        required={question.required}
      />
    );
  } else if (questionType === "multipleChoice" && question.options) {
    return (
      <ChoiceQuestion
        question={question.question}
        options={question.options}
        onChange={() => {}}
        required={question.required}
      />
    );
  } else if (questionType === "checkbox") {
    return (
      <BooleanQuestion
        question={question.question}
        onChange={() => {}}
        required={question.required}
      />
    );
  }

  return <div>FeedbackFormQuestion</div>;
};
