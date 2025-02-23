import { useMutation, useQuery } from "@tanstack/react-query";
import { api } from "../../services/api";
import { ResponsesChart } from "../../components/Charts/ResponsesChart";
import { QuestionTypesChart } from "../../components/Charts/QuestionTypesChart";
import { RatingQuestionsChart } from "../../components/Charts/RatingQuestionsChart";
import { queryKeys } from "../../lib/queryKeys";

export const Analytics = () => {
  const { data: responsesData, isLoading: isLoadingResponses } = useQuery({
    queryKey: [queryKeys.form.getAll, queryKeys.analytics.responsesOverTime],
    queryFn: api.feedbackForm.getResponsesOverTime,
  });

  const { data: questionTypesData, isLoading: isLoadingQuestionTypes } =
    useQuery({
      queryKey: [
        queryKeys.form.getAll,
        queryKeys.analytics.questionTypesDistribution,
      ],
      queryFn: api.feedbackForm.getQuestionTypesDistribution,
    });

  const { data: ratingData, isLoading: isLoadingRating } = useQuery({
    queryKey: [
      queryKeys.form.getAll,
      queryKeys.analytics.ratingQuestionsAverage,
    ],
    queryFn: api.feedbackForm.getRatingQuestionsAverage,
  });

  const { mutate } = useMutation({
    mutationKey: [queryKeys.feedbackResponse.exportCsv],
    mutationFn: api.feedbackResponse.exportCsv,
  });

  const hasNoData =
    !responsesData?.length &&
    (!questionTypesData?.length ||
      questionTypesData?.reduce((acc, curr) => acc + curr.count, 0) === 0) &&
    !ratingData?.length;
  const isLoading =
    isLoadingResponses || isLoadingQuestionTypes || isLoadingRating;

  if (isLoading) {
    return (
      <main className="w-full py-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold leading-tight text-gray-900">
              Analytics
            </h1>
          </div>
          <div className="flex items-center justify-center h-[400px]">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600" />
          </div>
        </div>
      </main>
    );
  }

  if (hasNoData) {
    return (
      <main className="w-full py-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold leading-tight text-gray-900">
              Analytics
            </h1>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex flex-col items-center justify-center h-[400px] text-gray-400">
              <svg
                className="w-12 h-12 mb-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
              <p className="text-lg font-medium">No analytics data available</p>
              <p className="text-sm mt-2">
                Create some forms and gather responses to see analytics
              </p>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="w-full py-10">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold leading-tight text-gray-900">
            Analytics
          </h1>
          <button
            onClick={() => mutate()}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Export to CSV
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {responsesData && responsesData.length > 0 && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 transition-all duration-200 hover:shadow-md">
              <h2 className="text-lg font-semibold text-gray-800 mb-6">
                Form Responses Over Time
              </h2>
              <ResponsesChart data={responsesData} />
            </div>
          )}

          {questionTypesData && questionTypesData.length > 0 && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 transition-all duration-200 hover:shadow-md">
              <h2 className="text-lg font-semibold text-gray-800 mb-6">
                Question Types Distribution
              </h2>
              <QuestionTypesChart data={questionTypesData} />
            </div>
          )}

          {ratingData && ratingData.length > 0 && (
            <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 p-6 transition-all duration-200 hover:shadow-md">
              <h2 className="text-lg font-semibold text-gray-800 mb-6">
                Rating Questions Performance
              </h2>
              <RatingQuestionsChart data={ratingData} />
            </div>
          )}
        </div>
      </div>
    </main>
  );
};
