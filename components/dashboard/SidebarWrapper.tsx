/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { Sidebar } from "./Sidebar";
import TopBar from "./TopBar";

function SidebarWrapper({ children }: any) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Reusable Sidebar */}
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Main Content Area */}
      <div className="flex-1 lg:pl-64 flex flex-col transition-all duration-300">
        {/* Reusable TopBar */}
        <TopBar toggleSidebar={toggleSidebar} />
        <div className="flex-1 px-4 py-4 sm:px-6 lg:px-8 overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
}

export default SidebarWrapper;
