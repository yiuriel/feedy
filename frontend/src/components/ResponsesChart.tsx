import { useMemo } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { FormResponsesOverTime } from "../services/api.types";

interface Props {
  data: FormResponsesOverTime[];
}

export const ResponsesChart = ({ data }: Props) => {
  const chartData = useMemo(() => {
    const dateMap = new Map<string, { [key: string]: number }>();
    
    data.forEach((form) => {
      form.responses.forEach((response) => {
        const date = new Date(response.date).toLocaleDateString();
        const existing = dateMap.get(date) || {};
        dateMap.set(date, {
          ...existing,
          [form.title]: (existing[form.title] || 0) + 1,
        });
      });
    });

    return Array.from(dateMap.entries())
      .map(([date, responses]) => ({
        date,
        ...responses,
      }))
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }, [data]);

  const colors = ["#8884d8", "#82ca9d", "#ffc658", "#ff7300", "#a4de6c"];

  return (
    <div className="w-full h-[400px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          {data.map((form, index) => (
            <Line
              key={form.id}
              type="monotone"
              dataKey={form.title}
              stroke={colors[index % colors.length]}
              activeDot={{ r: 8 }}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
