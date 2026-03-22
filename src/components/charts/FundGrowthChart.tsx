import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

export function FundGrowthChart({ data }: { data: Array<{ month: string; value: number }> }): JSX.Element {
  return (
    <div style={{ height: 260 }}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <defs>
            <linearGradient id="growth" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#1B3A6B" stopOpacity={0.45} />
              <stop offset="100%" stopColor="#1B3A6B" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Area type="monotone" dataKey="value" stroke="#1B3A6B" fill="url(#growth)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
