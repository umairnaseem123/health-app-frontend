import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

export default function BPTrendChart({ data }) {
  return (
    <ResponsiveContainer width="100%" height={280}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
        <XAxis dataKey="date" stroke="var(--text-muted)" fontSize={12} />
        <YAxis stroke="var(--text-muted)" fontSize={12} />
        <Tooltip
          contentStyle={{
            background: "var(--bg-card)",
            border: "1px solid var(--border)",
            borderRadius: 10,
          }}
        />
        <Legend />
        <Line
          type="monotone"
          dataKey="systolic"
          stroke="#EF4444"
          strokeWidth={2}
          dot={{ r: 3 }}
          name="Systolic"
        />
        <Line
          type="monotone"
          dataKey="diastolic"
          stroke="#3B82F6"
          strokeWidth={2}
          dot={{ r: 3 }}
          name="Diastolic"
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
