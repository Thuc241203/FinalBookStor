import { PieChart, Pie, Cell } from "recharts";

import { useGetAllFeedbackQuery } from "../../redux/api/feedbackApi";

const Dashboard = () => {
  const { data: feedbacks }: any = useGetAllFeedbackQuery();
  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
  }: any) => {
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
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div className="justify-center space-x-8">
      <div className="bg-white p-8 rounded shadow-md">
        <h2 className="text-2xl font-semibold mb-4">content</h2>
        <PieChart width={400} height={300}>
          <Pie
            data={feedbacks?.feedbacks}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={80}
            fill="#8884d8"
            dataKey="rating"
          >
            {feedbacks?.feedbacks?.map((index: any) => (
              <Cell key={`cell-${index}`} />
            ))}
          </Pie>
        </PieChart>
      </div>
    </div>
  );
};

export default Dashboard;
