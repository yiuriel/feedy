import { FC } from "react";
import { FeedbackForm } from "../../services/api.types";
import { useNavigate } from "react-router";

export const FormCard: FC<{ form: FeedbackForm }> = ({ form }) => {
  const navigate = useNavigate();

  const handleViewAsUser = () => {
    navigate(`/form/${form.accessToken}`);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 flex flex-col justify-between">
      <div>
        <h2 className="text-2xl font-semibold">{form.title}</h2>
        <p className="text-gray-600">{form.description}</p>
      </div>
      <div className="flex justify-between items-end">
        <button className="text-sm mt-4 flex-shrink border border-solid border-red-600 text-red-600 py-1 px-2 rounded-md">
          Delete
        </button>
        <div className="flex gap-2">
          <button
            className="text-sm mt-4 flex-shrink border border-solid border-indigo-600 text-indigo-600 py-1 px-2 rounded-md"
            onClick={handleViewAsUser}
          >
            View as user
          </button>
          <button className="text-sm mt-4 flex-shrink bg-indigo-600 text-white py-1 px-2 rounded-md">
            Edit
          </button>
        </div>
      </div>
    </div>
  );
};
