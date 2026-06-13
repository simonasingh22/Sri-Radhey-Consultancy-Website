import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';

const COLORS = ['#0F2B5B', '#1e3d73', '#C8A44D', '#0A6E4F', '#5A6A85', '#d6ba73'];

const StatusDistributionChart = ({ data = [] }) => {
  const chartData = data.map((d) => ({
    ...d,
    shortStatus: d.status?.length > 18 ? `${d.status.slice(0, 16)}…` : d.status,
  }));

  return (
    <div className="h-80 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData} margin={{ top: 8, right: 8, left: 0, bottom: 60 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis
            dataKey="shortStatus"
            tick={{ fontSize: 11 }}
            angle={-35}
            textAnchor="end"
            interval={0}
            height={70}
          />
          <YAxis allowDecimals={false} tick={{ fontSize: 12 }} />
          <Tooltip
            formatter={(value) => [value, 'Leads']}
            labelFormatter={(_, payload) => payload?.[0]?.payload?.status || ''}
          />
          <Bar dataKey="count" radius={[4, 4, 0, 0]}>
            {chartData.map((_, i) => (
              <Cell key={i} fill={COLORS[i % COLORS.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default StatusDistributionChart;
