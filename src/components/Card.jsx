import React from 'react';
import { ICONS } from './ICONS'; // It needs the icons!

/**
 * Dashboard Statistic Card Component
 */
const Card = ({ title, value, iconName }) => {
  const Icon = ICONS[iconName];
  return (
    <div className="bg-white rounded-lg shadow-md p-6 flex items-center space-x-4 transition-all hover:shadow-lg">
      <div className="flex-shrink-0 p-3 bg-blue-100 text-blue-600 rounded-full">
        {Icon && <Icon className="h-8 w-8" />}
      </div>
      <div>
        <p className="text-sm font-medium text-gray-500">{title}</p>
        <p className="text-3xl font-bold text-gray-900">{value}</p>
      </div>
    </div>
  );
};

export default Card;