import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { queryKeys } from "../../lib/queryKeys";
import { api } from "../../services/api";
import { useCallback } from "react";

export const FormsButton = () => {
  const navigate = useNavigate();

  const { data: user } = useQuery({
    queryKey: [queryKeys.user.me],
    queryFn: api.user.getCurrentUser,
  });

  const goToForms = useCallback(() => {
    navigate("/app/forms");
  }, [navigate]);

  if (!user) return null;

  return (
    <button
      className="hover:text-indigo-700 text-indigo-500 px-2 py-2"
      onClick={goToForms}
    >
      Forms
    </button>
  );
};
