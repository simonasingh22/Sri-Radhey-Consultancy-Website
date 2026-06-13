import React from 'react';
import { STATUS_COLORS } from '../constants/leadStatuses';

const StatusBadge = ({ status }) => (
  <span
    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
      STATUS_COLORS[status] || 'bg-gray-100 text-gray-800'
    }`}
  >
    {status || 'Unknown'}
  </span>
);

export default StatusBadge;
