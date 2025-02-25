import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../../lib/queryKeys";
import { api } from "../../services/api";
import { Loading } from "../../components/Loading";
import { FormCard } from "../../components/FormCard/FormCard";
import { Button } from "../../components/Button/Button";
import { useNavigate } from "react-router";
import { useCallback } from "react";
import { useSSEEventResponses } from "../../hooks/useSSEEventResponses";
import { useQueryClient } from "@tanstack/react-query";

export const Forms = () => {
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: [queryKeys.form.getAll],
    queryFn: api.feedbackForm.getAll,
  });

  const invalidateQueries = useCallback(() => {
    console.log("invalidating queries");

    queryClient.invalidateQueries();
  }, [queryClient]);

  useSSEEventResponses(invalidateQueries);

  const navigate = useNavigate();

  const goToForm = useCallback(() => {
    navigate("/app/create-feedback-form");
  }, [navigate]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="py-10 gap-4 flex flex-col container">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Forms</h1>
        <Button onClick={goToForm}>Create new form</Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {data?.map((form) => (
          <FormCard key={form.id} form={form} />
        ))}
      </div>
    </div>
  );
};
