import { useQuery } from "@tanstack/react-query";
import { OrganizationDetails } from "../../components/OrganizationDetails";
import { api } from "../../services/api";
import { Loading } from "../../components/Loading";
import { StatsCard } from "../../components/Card/StatsCard";
import { Navigate, useNavigate } from "react-router";
import { queryKeys } from "../../lib/queryKeys";

export default function Dashboard() {
  const navigate = useNavigate();

  const { data: user } = useQuery({
    queryKey: [queryKeys.auth.verify],
    queryFn: api.auth.verify,
  });

  const { data: needsDetails, isLoading: isLoadingNeedsDetails } = useQuery({
    queryKey: [queryKeys.organization.needsDetails],
    queryFn: api.organization.orgNeedsDetails,
  });

  const { data: stats, isLoading: isLoadingStats } = useQuery({
    queryKey: [queryKeys.dashboard.stats],
    queryFn: api.dashboard.getStats,
    enabled: !isLoadingNeedsDetails && !needsDetails,
  });

  if (isLoadingNeedsDetails) {
    return <Loading />;
  }

  if (!user) {
    return <Navigate to="/login" replace></Navigate>;
  }

  if (needsDetails) {
    return <OrganizationDetails />;
  }

  return (
    <main className="w-full  py-10">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold leading-tight text-gray-900">
          Dashboard
        </h1>

        <div className="mt-8">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
            <StatsCard
              title="Active Forms"
              value={stats?.activeForms || 0}
              isLoading={isLoadingStats}
            />
            <StatsCard
              title="Total Forms"
              value={stats?.totalForms || 0}
              isLoading={isLoadingStats}
            />
            <StatsCard
              title="Total Responses"
              value={stats?.totalResponses || 0}
              isLoading={isLoadingStats}
            />
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8">
          <h2 className="text-lg font-medium text-gray-900">Quick Actions</h2>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <button
              type="button"
              className="relative block w-full rounded-lg border-2 border-dashed border-gray-300 p-12 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              onClick={() => navigate("/app/create-feedback-form")}
            >
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
              <span className="mt-2 block text-sm font-medium text-gray-900">
                Add New Feedback Form
              </span>
            </button>

            <button
              type="button"
              className="relative block w-full rounded-lg border-2 border-dashed border-gray-300 p-12 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              onClick={() => navigate("/app/analytics")}
            >
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
              <span className="mt-2 block text-sm font-medium text-gray-900">
                View Analytics
              </span>
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
