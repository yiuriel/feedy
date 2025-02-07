import { useHealthCheck } from "../hooks/useHealthCheck";

export function HealthStatus() {
  const { data, isError, isLoading } = useHealthCheck();

  if (isLoading) {
    return (
      <div className="fixed bottom-4 right-4 bg-gray-800 text-white px-4 py-2 rounded-full shadow-lg">
        Checking backend status...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="fixed bottom-4 right-4 bg-red-600 text-white px-4 py-2 rounded-full shadow-lg animate-pulse">
        Backend is unreachable
      </div>
    );
  }

  if (!data) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 bg-green-600 text-white px-4 py-2 rounded-full shadow-lg">
      Backend v{data.version} ({data.environment})
    </div>
  );
}
