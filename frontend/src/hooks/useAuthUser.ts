import { useQuery } from "@tanstack/react-query";
import { api } from "../services/api";
import { useEffect } from "react";
import { useNavigate } from "react-router";

export const useAuthUser = () => {
  const navigate = useNavigate();

  const { data, isLoading: isLoadingUser } = useQuery({
    queryKey: ["user"],
    queryFn: api.user.getCurrentUser,
  });

  useEffect(() => {
    if (!data) return;

    navigate("/dashboard");
  }, [data, navigate]);

  return { isLoadingUser };
};
