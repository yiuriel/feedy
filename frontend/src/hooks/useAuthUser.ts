import { useQuery } from "@tanstack/react-query";
import { api } from "../services/api";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { queryKeys } from "../lib/queryKeys";

export const useAuthUser = () => {
  const navigate = useNavigate();

  const { data, isLoading: isLoadingUser } = useQuery({
    queryKey: queryKeys.auth.verify,
    queryFn: api.auth.verify,
  });

  useEffect(() => {
    if (!isLoadingUser && !data) {
      // navigate("/");
    }
  }, [data, isLoadingUser, navigate]);

  return { isLoadingUser };
};
