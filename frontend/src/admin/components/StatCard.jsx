import React from 'react';
import { motion } from 'framer-motion';

const StatCard = ({ label, value, icon: Icon, accent = 'primary' }) => {
  const accents = {
    primary: 'border-l-primary',
    accent: 'border-l-accent',
    secondary: 'border-l-secondary',
    green: 'border-l-green-600',
    gold: 'border-l-amber-500',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className={`bg-white rounded-lg shadow-premium border-l-4 ${accents[accent] || accents.primary} p-5`}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-text-muted">{label}</p>
          <p className="text-3xl font-display font-bold text-primary mt-1">{value ?? 0}</p>
        </div>
        {Icon && (
          <div className="p-2 rounded-lg bg-background-alt text-primary">
            <Icon size={20} />
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default StatCard;
