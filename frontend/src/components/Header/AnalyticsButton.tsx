import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { queryKeys } from "../../lib/queryKeys";
import { api } from "../../services/api";
import { useCallback } from "react";
import { useLocation } from "react-router";

export const AnalyticsButton = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { data: user } = useQuery({
    queryKey: [queryKeys.user.me],
    queryFn: api.user.getCurrentUser,
  });

  const goToAnalytics = useCallback(() => {
    navigate("/app/analytics");
  }, [navigate]);

  if (!user) return null;

  return (
    <button
      className={`hover:text-indigo-700 text-indigo-500 px-2 py-2 ${
        location.pathname === "/app/analytics" && "font-bold text-indigo-600"
      }`}
      onClick={goToAnalytics}
    >
      Analytics
    </button>
  );
};
