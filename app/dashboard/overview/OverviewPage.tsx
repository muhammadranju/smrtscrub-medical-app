"use client";
import React from "react";
import { StatData } from "@/types/interface";
import { CreditCard, FileText, ShieldCheck, Users } from "lucide-react";
import RevenueChart from "@/components/dashboard/RevenueChart";
import StatCard from "@/components/dashboard/StatCard";
import SubscriptionChart from "@/components/dashboard/SubscriptionChart";
import { useGetAllStatsQuery } from "@/lib/redux/features/api/dashboard/dashboardApiSlice";
import { Skeleton } from "@/components/ui/skeleton";

const OverviewPage: React.FC = () => {
  // Mock Data for Stats

  const { data: statsData, isLoading } = useGetAllStatsQuery(null);
  const summary = statsData?.data.summary || {};

  const stats: StatData[] = [
    {
      id: 1,
      label: "Total Doctors",
      value: summary?.doctors?.total || 0,
      percentage: summary?.doctors?.formattedGrowth || "0.00%",
      icon: Users,
      iconColor: "text-purple-600",
      iconBg: "bg-purple-100",
    },
    {
      id: 2,
      label: "Preference Cards",
      value: summary?.preferenceCards?.total || 0,
      percentage: summary?.preferenceCards?.formattedGrowth || "0.00%",
      icon: FileText,
      iconColor: "text-blue-600",
      iconBg: "bg-blue-100",
    },
    {
      id: 3,
      label: "Verified Cards",

      value: summary?.verifiedPreferenceCards?.total || 0,
      percentage: summary?.verifiedPreferenceCards?.formattedGrowth || "0.00%",
      icon: ShieldCheck,
      iconColor: "text-green-600",
      iconBg: "bg-green-100",
    },
    {
      id: 4,
      label: "Active Subscriptions",
      value: summary?.activeSubscriptions?.total || 0,
      percentage: summary?.activeSubscriptions?.formattedGrowth || "0.00%",

      icon: CreditCard,
      iconColor: "text-orange-600",
      iconBg: "bg-orange-100",
    },
  ];

  return (
    <>
      {/* Page Header */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Overview</h2>
        <p className="text-gray-500 mt-1">
          Welcome back, Admin. Here&apos;s your system overview.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
        {isLoading
          ? Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between"
              >
                <div className="space-y-3">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-8 w-16" />
                  <Skeleton className="h-3 w-20" />
                </div>
                <Skeleton className="h-10 w-10 rounded-xl" />
              </div>
            ))
          : stats.map((stat) => <StatCard key={stat.id} {...stat} />)}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {isLoading ? (
          <>
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <Skeleton className="h-5 w-32 mb-4" />
              <Skeleton className="h-64 w-full rounded-xl" />
            </div>
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <Skeleton className="h-5 w-40 mb-4" />
              <Skeleton className="h-64 w-full rounded-xl" />
            </div>
          </>
        ) : (
          <>
            <RevenueChart />
            <SubscriptionChart />
          </>
        )}
      </div>
    </>
  );
};

export default OverviewPage;
