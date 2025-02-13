import { EllipsisHorizontalIcon } from "@heroicons/react/24/outline";
import { FC } from "react";
import { FeedbackForm } from "../../services/api.types";
import { Menu } from "../Menu/Menu";
import { MenuItem } from "../Menu/MenuItem";

export const FormCard: FC<{ form: FeedbackForm }> = ({ form }) => {
  const handleViewAsUser = () => {
    window.open(`/form/${form.accessToken}`, "_blank", "noopener,noreferrer");
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(
      `http://localhost:5173/form/${form.accessToken}`
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 flex flex-col justify-between">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold flex flex-col">
          {form.title}{" "}
          <small className="text-gray-500 font-light text-sm">
            {form.description || "No description"}
          </small>
        </h2>
        <Menu
          trigger={
            <button>
              <EllipsisHorizontalIcon className="h-4 w-4" />
            </button>
          }
        >
          <MenuItem onClick={handleViewAsUser}>View as user</MenuItem>
          <MenuItem onClick={handleCopyLink}>Copy link</MenuItem>
        </Menu>
      </div>
      <div className="flex flex-col">
        <span className="text-gray-800 text-2xl">{form.responseCount}</span>{" "}
        <small>response{form.responseCount === 1 ? "" : "s"}</small>
      </div>
      <div className="flex justify-between items-end mt-4">
        <time dateTime={form.createdAt} className="text-gray-400 text-sm">
          Created{" "}
          {new Intl.DateTimeFormat("en-US", {
            year: "numeric",
            month: "long",
            day: "2-digit",
          }).format(new Date(form.createdAt))}
        </time>
        <time dateTime={form.updatedAt} className="text-gray-400 text-sm">
          Updated{" "}
          {new Intl.DateTimeFormat("en-US", {
            year: "numeric",
            month: "long",
            day: "2-digit",
          }).format(new Date(form.updatedAt))}
        </time>
      </div>
    </div>
  );
};
