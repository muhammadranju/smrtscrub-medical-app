import { NavItem } from "@/types/interface";
import {
  BarChart3,
  CreditCard,
  FileText,
  LayoutGrid,
  LogOut,
  Settings,
  Users,
  X,
} from "lucide-react";
import Link from "next/link";
import React from "react";

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
  const navItems: NavItem[] = [
    {
      label: "Dashboard",
      icon: LayoutGrid,
      href: "/dashboard/overview",
      isActive: true,
    },
    { label: "Doctors", icon: Users, href: "/dashboard/doctors" },
    {
      label: "Preference Cards",
      icon: FileText,
      href: "/dashboard/preference-cards",
    },
    {
      label: "Subscriptions",
      icon: CreditCard,
      href: "/dashboard/subscriptions",
    },
    { label: "Analytics", icon: BarChart3, href: "/dashboard/analytics" },
    { label: "Settings", icon: Settings, href: "/dashboard/settings" },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`
          fixed top-0 left-0 z-50 h-screen w-64 bg-white border-r border-gray-100 
          transition-transform duration-300 ease-in-out flex flex-col
          ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        {/* Logo Section */}
        <div className="h-20 flex items-center px-6 border-b border-gray-50">
          <div className="flex items-center gap-3">
            {/* Logo Placeholder - replicating the circle logo from image */}
            <div className="w-10 h-10 rounded-full border-2 border-[#9945FF] flex items-center justify-center p-0.5">
              <div className="w-full h-full rounded-full bg-teal-50 flex items-center justify-center text-[8px] font-bold text-teal-600 text-center leading-none">
                SMRT+
                <br />
                SCRUB
              </div>
            </div>
            {/* Mobile Close Button */}
            <button
              onClick={toggleSidebar}
              className="lg:hidden ml-auto text-gray-500"
            >
              <X size={24} />
            </button>
          </div>
        </div>

        {/* Navigation Section */}
        <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-1">
          {navItems.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className={`
                flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors
                ${
                  item.isActive
                    ? "bg-[#9945FF] text-white shadow-md shadow-purple-200"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }
              `}
            >
              <item.icon size={20} strokeWidth={item.isActive ? 2.5 : 2} />
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>

        {/* Bottom Section - Logout */}
        <div className="p-4 border-t border-gray-50">
          <button className="flex items-center gap-3 px-4 py-3 w-full text-red-600 hover:bg-red-50 rounded-lg transition-colors text-sm font-semibold">
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
};
