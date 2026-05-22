import React, { useState } from "react";
import { Bell, Menu, Search } from "lucide-react";
import NotificationPopup from "@/app/dashboard/overview/NotificationPopup";
import { usePathname } from "next/navigation";
import { Input } from "@/components/ui/input";

interface TopBarProps {
  toggleSidebar: () => void;
}

const TopBar: React.FC<TopBarProps> = ({ toggleSidebar }) => {
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const notificationCount = 3; // This should come from your notification state
  const pathname = usePathname();

  const getPageTitle = (path: string) => {
    if (path.includes("/dashboard/overview")) return "Overview";
    if (path.includes("/dashboard/specialties")) return "Specialties Management";
    if (path.includes("/dashboard/doctors")) return "Doctors Management";
    if (path.includes("/dashboard/preference-cards")) return "Preference Cards";
    if (path.includes("/dashboard/sutures")) return "Sutures Management";
    if (path.includes("/dashboard/supplies")) return "Supplies Management";
    return "Dashboard";
  };

  const title = getPageTitle(pathname);

  return (
    <>
      <header className="sticky top-0 z-30 w-full bg-white border-b border-gray-100 px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Left: Mobile Menu Toggle & Title */}
        <div className="flex items-center gap-4 flex-shrink-0">
          <button
            onClick={toggleSidebar}
            className="lg:hidden p-2 -ml-2 text-gray-600 hover:bg-gray-100 rounded-md"
          >
            <Menu size={24} />
          </button>

          <div className="flex flex-col">
            <h1 className="text-lg font-bold text-gray-900 leading-none">
              {title}
            </h1>
          </div>
        </div>

        {/* Center: Search Bar */}
        <div className="flex-1 max-w-xl hidden md:block">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <Input 
              placeholder="Search specialties..." 
              className="pl-10 bg-gray-50 border-gray-100 focus:bg-white transition-colors"
            />
          </div>
        </div>

        {/* Right: Notifications */}
        <div className="flex items-center gap-4 flex-shrink-0">
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
          
          <div className="h-8 w-px bg-gray-100 mx-2 hidden sm:block" />
          
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-700 hidden sm:block">Admin</span>
          </div>
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
