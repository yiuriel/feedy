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

  const colors = ["#6366f1", "#22c55e", "#f59e0b", "#ec4899", "#8b5cf6"];

  return (
    <div className="w-full h-[400px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
          <XAxis 
            dataKey="date" 
            stroke="#64748b"
            fontSize={12}
            tickLine={false}
            axisLine={{ stroke: '#e2e8f0' }}
          />
          <YAxis 
            stroke="#64748b"
            fontSize={12}
            tickLine={false}
            axisLine={{ stroke: '#e2e8f0' }}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: 'white',
              border: '1px solid #e2e8f0',
              borderRadius: '0.5rem',
              boxShadow: '0 1px 2px 0 rgb(0 0 0 / 0.05)'
            }}
          />
          <Legend 
            verticalAlign="top"
            height={36}
            iconType="circle"
            wrapperStyle={{
              paddingBottom: '20px'
            }}
          />
          {data.map((form, index) => (
            <Line
              key={form.id}
              type="monotone"
              dataKey={form.title}
              stroke={colors[index % colors.length]}
              strokeWidth={2}
              dot={{ r: 4, strokeWidth: 2 }}
              activeDot={{ r: 6, strokeWidth: 2 }}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
