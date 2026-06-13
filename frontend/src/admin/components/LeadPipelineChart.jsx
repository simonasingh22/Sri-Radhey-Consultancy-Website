import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { LEAD_STATUSES } from '../constants/leadStatuses';

const PIPELINE_COLORS = [
  '#0F2B5B',
  '#1e3d73',
  '#3b5998',
  '#0A6E4F',
  '#C8A44D',
  '#d6ba73',
  '#f59e0b',
  '#06b6d4',
  '#0284c7',
  '#16a34a',
  '#059669',
  '#dc2626',
];

const LeadPipelineChart = ({ distribution = [] }) => {
  const countMap = Object.fromEntries(distribution.map((d) => [d.status, d.count]));
  const chartData = LEAD_STATUSES.map((status) => ({
    name: status,
    value: countMap[status] || 0,
  })).filter((d) => d.value > 0);

  if (!chartData.length) {
    return (
      <div className="h-80 flex items-center justify-center text-text-muted text-sm">
        No lead data yet
      </div>
    );
  }

  return (
    <div className="h-80 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={chartData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius={55}
            outerRadius={95}
            paddingAngle={2}
          >
            {chartData.map((_, i) => (
              <Cell key={i} fill={PIPELINE_COLORS[i % PIPELINE_COLORS.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(value) => [value, 'Leads']} />
          <Legend wrapperStyle={{ fontSize: 11 }} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LeadPipelineChart;
