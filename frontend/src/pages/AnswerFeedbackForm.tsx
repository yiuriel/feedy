import { useParams } from "react-router";
import { FeedbackFormPasswordCheck } from "../components/FeedbackForm/FeedbackFormPasswordCheck";

export const AnswerFeedbackForm = () => {
  const params = useParams<{ id: string }>();

  if (!params.id) {
    return null;
  }

  return (
    <div className="container mx-auto">
      <FeedbackFormPasswordCheck accessToken={params.id} />
    </div>
  );
};
