import React from "react";
import { ActivityData } from "../../types/interface";

interface ActivityListProps {
  activities: ActivityData[];
}

const ActivityList: React.FC<ActivityListProps> = ({ activities }) => {
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] overflow-hidden">
      {/* Header */}
      <div className="p-6 flex items-center justify-between border-b border-gray-50">
        <h2 className="text-lg font-bold text-gray-900">Recent Activity</h2>
        <button className="text-sm font-semibold text-[#9945FF] hover:text-purple-700 transition-colors">
          View All
        </button>
      </div>

      {/* List */}
      <div className="p-6">
        <div className="space-y-6">
          {activities.map((activity) => (
            <div
              key={activity.id}
              className="flex items-center justify-between group"
            >
              <div className="flex items-center gap-4">
                {/* Avatar Initials */}
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold ${activity.avatarColor}`}
                >
                  {activity.initials}
                </div>

                {/* Details */}
                <div>
                  <h4 className="text-sm font-bold text-gray-900 group-hover:text-[#9945FF] transition-colors">
                    {activity.name}
                  </h4>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Last active: {activity.lastActive}
                  </p>
                </div>
              </div>

              {/* Status Badge */}
              <div
                className={`
                px-3 py-1 rounded-full text-xs font-semibold capitalize
                ${
                  activity.status === "active"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }
              `}
              >
                {activity.status}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ActivityList;
