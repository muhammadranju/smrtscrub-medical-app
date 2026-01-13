import React from "react";
import { LucideIcon } from "lucide-react";

interface AnalyticsStatCardProps {
  title: string;
  value: string | number;
  description: string;
  icon: LucideIcon;
  iconColor: string;
  iconBg: string;
}

const AnalyticsStatCard: React.FC<AnalyticsStatCardProps> = ({
  title,
  value,
  description,
  icon: Icon,
  iconColor,
  iconBg,
}) => {
  return (
    <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)]">
      <div className="flex items-center gap-4">
        {/* Icon */}
        <div
          className={`w-10 h-10 rounded-lg ${iconBg} ${iconColor} flex items-center justify-center`}
        >
          <Icon size={20} />
        </div>

        {/* Title */}
        <h3 className="font-bold text-gray-900 text-lg">{title}</h3>
      </div>

      {/* Value Area */}
      <div className="mt-5">
        <div className="text-4xl font-bold text-gray-900 tracking-tight">
          {value}
        </div>
        <p className="text-sm text-gray-500 mt-2 font-medium">{description}</p>
      </div>
    </div>
  );
};

export default AnalyticsStatCard;
