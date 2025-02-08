interface StatsCardProps {
  title: string;
  value: string | number;
  isLoading?: boolean;
}

export function StatsCard({ title, value, isLoading = false }: StatsCardProps) {
  return (
    <div className="bg-white overflow-hidden shadow rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <dt className="text-sm font-medium text-gray-500 truncate">{title}</dt>
        <dd className="mt-1 text-3xl font-semibold text-gray-900">
          {isLoading ? "..." : value}
        </dd>
      </div>
    </div>
  );
}
