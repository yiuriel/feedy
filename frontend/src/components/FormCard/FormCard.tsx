import { EllipsisHorizontalIcon } from "@heroicons/react/24/outline";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FC, useState } from "react";
import { api } from "../../services/api";
import { FeedbackForm } from "../../services/api.types";
import { Menu } from "../Menu/Menu";
import { MenuItem } from "../Menu/MenuItem";
import { queryKeys } from "../../lib/queryKeys";
import { FormEdit } from "./FormEdit";

export const FormCard: FC<{ form: FeedbackForm }> = ({ form }) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const queryClient = useQueryClient();
  
  const { mutate: remove } = useMutation({
    mutationFn: () => api.feedbackForm.remove(form.accessToken),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.form.getAll],
      });
      queryClient.invalidateQueries({
        queryKey: [queryKeys.dashboard.stats],
      });
    },
  });

  const handleViewAsUser = () => {
    window.open(`/form/${form.accessToken}`, "_blank", "noopener,noreferrer");
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(
      `http://localhost:5173/form/${form.accessToken}`
    );
  };

  const handleRemoveForm = async () => {
    await remove();
  };

  return (
    <>
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col justify-between h-full transition-all duration-200 hover:shadow-md">
        <div>
          <div className="flex justify-between items-start">
            <h2 className="text-xl font-semibold flex flex-col">
              {form.title}
              <small className="text-gray-500 font-normal text-sm mt-1 line-clamp-2">
                {form.description || "No description"}
              </small>
            </h2>
            <Menu
              trigger={
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <EllipsisHorizontalIcon className="h-5 w-5 text-gray-500" />
                </button>
              }
            >
              <MenuItem onClick={handleViewAsUser}>View as user</MenuItem>
              <MenuItem onClick={handleCopyLink}>Copy link</MenuItem>
              <MenuItem onClick={() => setIsEditModalOpen(true)}>Edit form</MenuItem>
              <MenuItem
                onClick={handleRemoveForm}
                className="text-red-500 hover:bg-red-50 hover:!text-red-700"
              >
                Remove form
              </MenuItem>
            </Menu>
          </div>

          <div className="mt-4 bg-gray-50 rounded-lg py-2 px-4">
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold bg-gradient-to-tr from-blue-700 to-indigo-300 bg-clip-text text-transparent">
                {form.responseCount}
              </span>
              <span className="text-gray-600 text-md">
                response{form.responseCount === 1 ? "" : "s"}
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2 mt-4 text-xs text-gray-500">
          <div className="flex items-center gap-2">
            <span className="font-medium">Created:</span>
            <time dateTime={form.createdAt}>
              {new Intl.DateTimeFormat("en-US", {
                year: "numeric",
                month: "long",
                day: "2-digit",
              }).format(new Date(form.createdAt))}
            </time>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-medium">Updated:</span>
            <time dateTime={form.updatedAt}>
              {new Intl.DateTimeFormat("en-US", {
                year: "numeric",
                month: "long",
                day: "2-digit",
              }).format(new Date(form.updatedAt))}
            </time>
          </div>
        </div>
      </div>

      <FormEdit
        form={form}
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
      />
    </>
  );
};
