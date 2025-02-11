import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../lib/queryKeys";
import { api } from "../services/api";
import { Loading } from "../components/Loading";
import { FormCard } from "../components/FormCard/FormCard";

export const Forms = () => {
  const { data, isLoading } = useQuery({
    queryKey: queryKeys.form.list,
    queryFn: api.feedbackForm.getAll,
  });

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="container mx-auto p-4 gap-4 flex flex-col">
      <h1 className="text-3xl font-bold">Forms</h1>
      <div className="grid grid-cols-2 gap-4">
        {data?.map((form) => (
          <FormCard key={form.id} form={form} />
        ))}
      </div>
    </div>
  );
};
