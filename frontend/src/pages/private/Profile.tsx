import { queryKeys } from "../../lib/queryKeys";
import { useQuery } from "@tanstack/react-query";
import { api } from "../../services/api";
import { Loading } from "../../components/Loading";
import { InviteUserButton } from "../../components/Profile/InviteUserButton";

export const Profile = () => {
  const { data: user, isLoading } = useQuery({
    queryKey: [queryKeys.user.me],
    queryFn: api.user.getCurrentUser,
  });

  if (isLoading) return <Loading />;

  if (!user) return null;

  return (
    <div className="py-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Profile</h1>
        <InviteUserButton />
      </div>

      {/* Personal Info Card */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <div className="flex items-center">
          <div className="w-20 h-20 bg-indigo-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
            {user.name.charAt(0)}
          </div>
          <div className="ml-4 flex-grow">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-semibold text-gray-800">
                  {user.name}
                </h2>
                <p className="text-gray-600">{user.email}</p>
              </div>
              <span className="px-4 py-2 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium capitalize">
                {user.role}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Organization Card */}
      <div className="bg-white shadow-md rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-6 text-gray-800 flex items-center">
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
            />
          </svg>
          Organization Details
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="col-span-2">
            <h4 className="text-lg font-semibold text-gray-700 mb-1">
              {user.organization.name}
            </h4>
            <p className="text-gray-600 mb-4">
              {user.organization.description || "No description provided"}
            </p>
          </div>

          <div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h5 className="text-sm font-medium text-gray-500 mb-2">
                Industry
              </h5>
              <p className="text-gray-700">
                {user.organization.industry || "Not specified"}
              </p>
            </div>
          </div>

          <div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h5 className="text-sm font-medium text-gray-500 mb-2">
                Company Size
              </h5>
              <p className="text-gray-700">
                {user.organization.size || "Not specified"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
