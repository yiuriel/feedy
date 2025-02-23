import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { ArrowLeftStartOnRectangleIcon } from "@heroicons/react/24/solid";
import { api } from "../../services/api";
import { Tooltip } from "../Tooltip/Tooltip";

export const LogoutButton = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: logout } = useMutation({
    mutationFn: api.auth.logout,
    onSuccess: () => {
      queryClient.clear();
      navigate("/");
    },
  });

  return (
    <Tooltip content="Logout" position="bottom">
      <button
        onClick={() => logout()}
        className="border border-solid border-indigo-600 text-indigo-600 px-1 py-1 rounded-full"
      >
        <ArrowLeftStartOnRectangleIcon className="h-5 w-5" />
      </button>
    </Tooltip>
  );
};
