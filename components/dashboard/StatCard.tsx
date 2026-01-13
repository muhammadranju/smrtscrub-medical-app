import React from "react";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  label: string;
  value: string | number;
  percentage: string;
  icon: LucideIcon;
  iconColor: string;
  iconBg: string;
}

const StatCard: React.FC<StatCardProps> = ({
  label,
  value,
  percentage,
  icon: Icon,
  iconColor,
  iconBg,
}) => {
  return (
    <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] hover:shadow-lg transition-shadow duration-200">
      <div className="flex justify-between items-start">
        {/* Icon Container */}
        <div className={`p-3 rounded-lg ${iconBg} ${iconColor}`}>
          <Icon size={24} />
        </div>

        {/* Percentage Badge */}
        <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-full">
          {percentage}
        </span>
      </div>

      <div className="mt-4">
        <h3 className="text-3xl font-bold text-gray-900">{value}</h3>
        <p className="text-sm text-gray-500 mt-1 font-medium">{label}</p>
      </div>
    </div>
  );
};

export default StatCard;
