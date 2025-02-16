import { useQuery } from "@tanstack/react-query";
import { api } from "../services/api";
import { ResponsesChart } from "../components/ResponsesChart";

export const Analytics = () => {
  const { data: responsesData, isLoading } = useQuery({
    queryKey: ["responses-over-time"],
    queryFn: api.feedbackForm.getResponsesOverTime,
  });

  return (
    <main className="w-full py-10">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-3xl font-bold leading-tight text-gray-900 mb-8">
          Analytics
        </h1>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Form Responses Over Time</h2>
          {isLoading ? (
            <div className="flex items-center justify-center h-[400px]">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
            </div>
          ) : responsesData && responsesData.length > 0 ? (
            <ResponsesChart data={responsesData} />
          ) : (
            <div className="flex items-center justify-center h-[400px] text-gray-500">
              No response data available
            </div>
          )}
        </div>
      </div>
    </main>
  );
};
