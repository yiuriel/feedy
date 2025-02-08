import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { queryKeys } from "../../lib/queryKeys";
import { api } from "../../services/api";

export const Header = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: user } = useQuery({
    queryKey: queryKeys.user.me,
    queryFn: api.user.getCurrentUser,
  });

  const { mutate: logout } = useMutation({
    mutationFn: api.auth.logout,
    onSuccess: () => {
      queryClient.clear();
      navigate("/");
    },
  });

  return (
    <header className="bg-white shadow-sm z-10 p-2">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold text-indigo-600">Feedy</h1>
        <button
          onClick={() => logout()}
          className="bg-indigo-600 text-white px-2 py-1 rounded-md"
        >
          Logout
        </button>
      </div>
    </header>
  );
};
