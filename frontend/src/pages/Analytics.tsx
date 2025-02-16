import { useQuery } from "@tanstack/react-query";
import { api } from "../services/api";
import { ResponsesChart } from "../components/ResponsesChart";
import { QuestionTypesChart } from "../components/QuestionTypesChart";
import { RatingQuestionsChart } from "../components/RatingQuestionsChart";

export const Analytics = () => {
  const { data: responsesData, isLoading: isLoadingResponses } = useQuery({
    queryKey: ["responses-over-time"],
    queryFn: api.feedbackForm.getResponsesOverTime,
  });

  const { data: questionTypesData, isLoading: isLoadingQuestionTypes } = useQuery({
    queryKey: ["question-types-distribution"],
    queryFn: api.feedbackForm.getQuestionTypesDistribution,
  });

  const { data: ratingData, isLoading: isLoadingRating } = useQuery({
    queryKey: ["rating-questions-average"],
    queryFn: api.feedbackForm.getRatingQuestionsAverage,
  });

  return (
    <main className="w-full py-10">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold leading-tight text-gray-900 mb-8">
          Analytics
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 transition-all duration-200 hover:shadow-md">
            <h2 className="text-lg font-semibold text-gray-800 mb-6">
              Form Responses Over Time
            </h2>
            {isLoadingResponses ? (
              <div className="flex items-center justify-center h-[400px]">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600" />
              </div>
            ) : responsesData && responsesData.length > 0 ? (
              <ResponsesChart data={responsesData} />
            ) : (
              <div className="flex flex-col items-center justify-center h-[400px] text-gray-400">
                <svg className="w-12 h-12 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                No response data available
              </div>
            )}
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 transition-all duration-200 hover:shadow-md">
            <h2 className="text-lg font-semibold text-gray-800 mb-6">
              Question Types Distribution
            </h2>
            {isLoadingQuestionTypes ? (
              <div className="flex items-center justify-center h-[400px]">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600" />
              </div>
            ) : questionTypesData && questionTypesData.length > 0 ? (
              <QuestionTypesChart data={questionTypesData} />
            ) : (
              <div className="flex flex-col items-center justify-center h-[400px] text-gray-400">
                <svg className="w-12 h-12 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
                </svg>
                No question type data available
              </div>
            )}
          </div>

          <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 p-6 transition-all duration-200 hover:shadow-md">
            <h2 className="text-lg font-semibold text-gray-800 mb-6">
              Rating Questions Performance
            </h2>
            {isLoadingRating ? (
              <div className="flex items-center justify-center h-[400px]">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600" />
              </div>
            ) : ratingData && ratingData.length > 0 ? (
              <RatingQuestionsChart data={ratingData} />
            ) : (
              <div className="flex flex-col items-center justify-center h-[400px] text-gray-400">
                <svg className="w-12 h-12 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
                No rating question data available
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};
