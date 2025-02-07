import { useQuery } from "@tanstack/react-query";
import { api } from "../services/api";

export function useHealthCheck() {
  return useQuery({
    queryKey: ["health"],
    queryFn: api.health.check,
    refetchInterval: 30000, // Check every 30 seconds
    retry: 3,
  });
}
