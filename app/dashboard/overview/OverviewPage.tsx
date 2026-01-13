"use client";

import React from "react";

import { ActivityData, StatData } from "@/types/interface";
import { CreditCard, FileText, ShieldCheck, Users } from "lucide-react";

import ActivityList from "@/components/dashboard/ActivityList";
import StatCard from "@/components/dashboard/StatCard";

const OverviewPage: React.FC = () => {
  // Mock Data for Stats
  const stats: StatData[] = [
    {
      id: 1,
      label: "Total Doctors",
      value: "5",
      percentage: "+12%",
      icon: Users,
      iconColor: "text-purple-600",
      iconBg: "bg-purple-100",
    },
    {
      id: 2,
      label: "Preference Cards",
      value: "4",
      percentage: "+24%",
      icon: FileText,
      iconColor: "text-blue-600",
      iconBg: "bg-blue-100",
    },
    {
      id: 3,
      label: "Verified Cards",
      value: "2",
      percentage: "+8%",
      icon: ShieldCheck,
      iconColor: "text-green-600",
      iconBg: "bg-green-100",
    },
    {
      id: 4,
      label: "Active Subscriptions",
      value: "3",
      percentage: "+5%",
      icon: CreditCard,
      iconColor: "text-orange-600",
      iconBg: "bg-orange-100",
    },
  ];

  // Mock Data for Recent Activity
  const activities: ActivityData[] = [
    {
      id: 1,
      initials: "DSJ",
      name: "Dr. Sarah Johnson",
      lastActive: "Jan 5, 08:30 AM",
      status: "active",
      avatarColor: "bg-[#9945FF]",
    },
    {
      id: 2,
      initials: "DMC",
      name: "Dr. Michael Chen",
      lastActive: "Jan 4, 04:45 PM",
      status: "active",
      avatarColor: "bg-[#9945FF]",
    },
    {
      id: 3,
      initials: "DER",
      name: "Dr. Emily Rodriguez",
      lastActive: "Jan 3, 09:30 AM",
      status: "active",
      avatarColor: "bg-[#9945FF]",
    },
    {
      id: 4,
      initials: "DJW",
      name: "Dr. James Williams",
      lastActive: "Dec 20, 02:00 PM",
      status: "suspended", // Note: Image shows "suspended" with red badge
      avatarColor: "bg-[#9945FF]",
    },
  ];

  return (
    <>
      {/* Page Header */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Dashboard</h2>
        <p className="text-gray-500 mt-1">
          Welcome back, Admin. Here&apos;s your system overview.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <StatCard key={stat.id} {...stat} />
        ))}
      </div>

      {/* Recent Activity Section */}
      <div className="w-full">
        <ActivityList activities={activities} />
      </div>
    </>
  );
};

export default OverviewPage;
