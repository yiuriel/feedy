import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { RatingQuestionAverage } from "../../services/api.types";

interface Props {
  data: RatingQuestionAverage[];
}

export const RatingQuestionsChart = ({ data }: Props) => {
  const chartData = data.map((item) => ({
    name: `${item.formTitle} - ${item.question}`,
    average: item.average,
    responses: item.totalResponses,
  }));

  return (
    <div className="w-full h-[400px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={chartData}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 20,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
          <XAxis
            dataKey="name"
            stroke="#64748b"
            fontSize={12}
            tickLine={false}
            axisLine={{ stroke: "#e2e8f0" }}
            height={20}
            interval={0}
            tick={({ x, y, payload }) => (
              <g transform={`translate(${x},${y})`}>
                <text
                  x={0}
                  y={0}
                  dy={16}
                  textAnchor="end"
                  fill="#64748b"
                  fontSize={14}
                  fontWeight={600}
                >
                  {payload.value}
                </text>
              </g>
            )}
          />
          <YAxis
            yAxisId="left"
            orientation="left"
            stroke="#6366f1"
            fontSize={12}
            tickLine={false}
            axisLine={{ stroke: "#e2e8f0" }}
            label={{
              value: "Average Rating",
              angle: -90,
              position: "insideLeft",
              style: { fill: "#6366f1" },
            }}
          />
          <YAxis
            yAxisId="right"
            orientation="right"
            stroke="#7c3aed"
            fontSize={12}
            tickLine={false}
            axisLine={{ stroke: "#e2e8f0" }}
            label={{
              value: "Total Responses",
              angle: 90,
              position: "insideRight",
              style: { fill: "#7c3aed" },
            }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "white",
              border: "1px solid #e2e8f0",
              borderRadius: "0.5rem",
              boxShadow: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
            }}
          />
          <Legend
            verticalAlign="top"
            height={36}
            iconType="circle"
            wrapperStyle={{
              paddingBottom: "20px",
            }}
          />
          <Bar
            yAxisId="left"
            dataKey="average"
            fill="#6366f1"
            name="Average Rating"
            radius={[4, 4, 0, 0]}
          />
          <Bar
            yAxisId="right"
            dataKey="responses"
            fill="#7c3aed"
            name="Total Responses"
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
