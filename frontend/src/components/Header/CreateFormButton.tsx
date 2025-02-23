import { useNavigate } from "react-router";
import { PlusIcon } from "@heroicons/react/24/solid";
import { Tooltip } from "../Tooltip/Tooltip";

export const CreateFormButton = () => {
  const navigate = useNavigate();

  return (
    <Tooltip content="Create feedback form" position="bottom">
      <button
        className="text-indigo-600 border border-solid border-indigo-600 p-1 rounded-full hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
        onClick={() => navigate("/app/create-feedback-form")}
        aria-label="Create form"
      >
        <PlusIcon className="h-5 w-5" />
      </button>
    </Tooltip>
  );
};
