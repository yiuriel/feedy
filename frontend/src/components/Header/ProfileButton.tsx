import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { queryKeys } from "../../lib/queryKeys";
import { api } from "../../services/api";
import { useCallback } from "react";

export const ProfileButton = () => {
  const navigate = useNavigate();

  const { data: user } = useQuery({
    queryKey: queryKeys.user.me,
    queryFn: api.user.getCurrentUser,
  });

  const goToProfile = useCallback(() => {
    navigate("/app/profile");
  }, [navigate]);

  if (!user) return null;

  return (
    <button
      className="border border-solid border-indigo-600 text-indigo-600 px-2 py-2 rounded-full"
      onClick={goToProfile}
    >
      {user?.name}
    </button>
  );
};
