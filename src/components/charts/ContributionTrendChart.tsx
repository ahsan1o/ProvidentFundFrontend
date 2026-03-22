import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

export function ContributionTrendChart({ data }: { data: Array<{ month: string; value: number }> }): JSX.Element {
  return (
    <div style={{ height: 260 }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="value" stroke="#1B3A6B" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
