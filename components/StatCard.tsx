import React from 'react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  bgIconColor: string;
  alert?: boolean;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, bgIconColor, alert }) => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
      <div>
        <p className="text-gray-500 text-sm font-medium mb-1">{title}</p>
        <h3 className="text-3xl font-bold text-gray-800">{value}</h3>
      </div>
      <div className={`p-4 rounded-2xl text-white ${bgIconColor} shadow-md`}>
        {icon}
      </div>
    </div>
  );
};

export default StatCard;