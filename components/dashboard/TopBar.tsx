import React from "react";
import { Bell, Menu } from "lucide-react";

interface TopBarProps {
  toggleSidebar: () => void;
}

const TopBar: React.FC<TopBarProps> = ({ toggleSidebar }) => {
  return (
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

      {/* Right: Notifications & Profile (Simplified as per image) */}
      <div className="flex items-center gap-4">
        <button className="relative p-2 text-gray-500 hover:text-gray-700 transition-colors">
          <Bell size={24} />
          {/* Notification Badge */}
          <span className="absolute top-1 right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white ring-2 ring-white">
            3
          </span>
        </button>

        {/* If there was a user avatar in top right, it would go here. 
            The reference image shows mostly just the bell on the right 
            aligned with the header content. */}
      </div>
    </header>
  );
};

export default TopBar;
