import React, { useState } from "react";
import { Bell, Menu } from "lucide-react";
import NotificationPopup from "@/app/dashboard/overview/NotificationPopup";

interface TopBarProps {
  toggleSidebar: () => void;
}

const TopBar: React.FC<TopBarProps> = ({ toggleSidebar }) => {
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const notificationCount = 3; // This should come from your notification state

  return (
    <>
      <header className="sticky top-0 z-30 w-full bg-white border-b border-gray-100 px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Left: Mobile Menu Toggle & Title */}
        <div className="flex items-center gap-4">
          <button
            onClick={toggleSidebar}
            className="lg:hidden p-2 -ml-2 text-gray-600 hover:bg-gray-100 rounded-md"
          >
            <Menu size={24} />
          </button>

          <div className="flex flex-col">
            <h1 className="text-lg font-bold text-gray-900 leading-none">
              Dashboard
            </h1>
            <span className="text-xs text-gray-500 mt-1">Admin Panel</span>
          </div>
        </div>

        {/* Right: Notifications */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsNotificationOpen(!isNotificationOpen)}
            className="relative p-2 text-gray-500 hover:text-gray-700 transition-colors"
          >
            <Bell size={24} />
            {/* Notification Badge */}
            {notificationCount > 0 && (
              <span className="absolute top-1 right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white ring-2 ring-white">
                {notificationCount}
              </span>
            )}
          </button>
        </div>
      </header>

      {/* Notification Popup */}
      <NotificationPopup
        isOpen={isNotificationOpen}
        onClose={() => setIsNotificationOpen(false)}
      />
    </>
  );
};

export default TopBar;
