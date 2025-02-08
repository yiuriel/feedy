import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { ArrowLeftStartOnRectangleIcon } from "@heroicons/react/16/solid";
import { api } from "../../services/api";

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
    <button
      onClick={() => logout()}
      className="border border-solid border-indigo-600 text-indigo-600 px-2 py-2 rounded-full"
    >
      <ArrowLeftStartOnRectangleIcon className="h-5 w-5" />
    </button>
  );
};
