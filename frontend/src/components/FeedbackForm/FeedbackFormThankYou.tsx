import { FC } from "react";
import { CheckCircleIcon } from "@heroicons/react/24/solid";

interface FeedbackFormThankYouProps {
  customThankYouPage?: string;
}

export const FeedbackFormThankYou: FC<FeedbackFormThankYouProps> = ({
  customThankYouPage,
}) => {
  return (
    <div className="max-w-2xl mx-auto py-8">
      <div className="flex flex-col items-center space-y-4 mx-auto bg-white rounded-xl shadow-lg p-8">
        <CheckCircleIcon className="w-16 h-16 text-green-500" />
        <h1 className="text-4xl font-bold text-center text-indigo-900">
          Thank You for Your Feedback
        </h1>
        {customThankYouPage ? (
          <div className="text-center text-gray-600 prose prose-indigo text-xl">
            {customThankYouPage}
          </div>
        ) : (
          <div className="text-center text-gray-600 space-y-3 text-xl">
            <p>
              Your feedback has been submitted anonymously and securely. We
              value your honest input as it helps us make meaningful
              improvements.
            </p>
            <p>
              Your voice matters in shaping a better experience for everyone.
              Thank you for taking the time to share your thoughts with us.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
