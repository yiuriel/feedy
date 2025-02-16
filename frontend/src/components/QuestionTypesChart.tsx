import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";
import { QuestionTypeDistribution } from "../services/api.types";

interface Props {
  data: QuestionTypeDistribution[];
}

const COLORS = [
  "#312e81", // indigo-900
  "#4338ca", // indigo-700
  "#6366f1", // indigo-500
  "#818cf8", // indigo-400
];
const RADIAN = Math.PI / 180;

const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}: {
  cx: number;
  cy: number;
  midAngle: number;
  innerRadius: number;
  outerRadius: number;
  percent: number;
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(2)}%`}
    </text>
  );
};

export const QuestionTypesChart = ({ data }: Props) => {
  const total = data.reduce((sum, item) => sum + item.count, 0);

  return (
    <div className="w-full h-[400px]">
      <ResponsiveContainer width="100%" height="95%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={150}
            fill="#8884d8"
            dataKey="count"
            nameKey="type"
            strokeWidth={2}
          >
            {data.map((_, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                const { type, count } = payload[0].payload;
                return (
                  <div className="p-2 bg-white shadow rounded">
                    <p className="text-sm font-bold text-gray-900">
                      {type.charAt(0).toUpperCase() +
                        type.slice(1).replace("_", " ")}
                    </p>
                    <p className="text-sm font-medium text-gray-500">
                      {count} questions
                    </p>
                  </div>
                );
              }
              return null;
            }}
          />
          <Legend
            verticalAlign="bottom"
            iconType="circle"
            wrapperStyle={{
              paddingTop: "20px",
            }}
            formatter={(value) =>
              value.charAt(0).toUpperCase() + value.slice(1).replace("_", " ")
            }
          />
        </PieChart>
      </ResponsiveContainer>
      <div className="text-center pt-2 text-gray-500">
        Total Questions: {total}
      </div>
    </div>
  );
};
