import { useParams } from "react-router";
import { FeedbackForm } from "../components/FeedbackForm/FeedbackForm";

export const AnswerFeedbackForm = () => {
  const params = useParams<{ id: string }>();

  if (!params.id) {
    return null;
  }

  return (
    <div>
      <FeedbackForm id={params.id} />
    </div>
  );
};
