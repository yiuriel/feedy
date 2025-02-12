import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../lib/queryKeys";
import { api } from "../services/api";
import { Loading } from "../components/Loading";
import { FormCard } from "../components/FormCard/FormCard";
import { Button } from "../components/Button/Button";
import { useNavigate } from "react-router";
import { useCallback } from "react";

export const Forms = () => {
  const { data, isLoading } = useQuery({
    queryKey: queryKeys.form.list,
    queryFn: api.feedbackForm.getAll,
  });

  const navigate = useNavigate();

  const goToForm = useCallback(() => {
    navigate("/app/create-feedback-form");
  }, [navigate]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="container mx-auto py-10 gap-4 flex flex-col">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Forms</h1>
        <Button onClick={goToForm}>Create new form</Button>
      </div>
      <div className="grid grid-cols-2 mt-8 gap-4">
        {data?.map((form) => (
          <FormCard key={form.id} form={form} />
        ))}
      </div>
    </div>
  );
};
