import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const COLORS = { Low: "#22C55E", Medium: "#F59E0B", High: "#EF4444" };

export default function RiskScoreChart({ confidence, riskLevel }) {
  const data = [
    { name: "confidence", value: confidence },
    { name: "remainder", value: 100 - confidence },
  ];

  return (
    <div className="relative w-40 h-40 mx-auto">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            innerRadius={55}
            outerRadius={70}
            startAngle={90}
            endAngle={-270}
            stroke="none"
          >
            <Cell fill={COLORS[riskLevel] || "#22C55E"} />
            <Cell fill="var(--border)" />
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-2xl font-bold">{confidence}%</span>
        <span className="text-xs text-[var(--text-secondary)]">Confidence</span>
      </div>
    </div>
  );
}
