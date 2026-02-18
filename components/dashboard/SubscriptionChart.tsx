"use client";

import { useGetActiveSubscriptionsMonthlyQuery } from "@/lib/redux/features/api/dashboard/dashboardApiSlice";
import React from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const mockData = [
  { label: "Jan", count: 0 },
  { label: "Feb", count: 0 },
  { label: "Mar", count: 0 },
  { label: "Apr", count: 0 },
  { label: "May", count: 0 },
  { label: "Jun", count: 0 },
  { label: "Jul", count: 0 },
  { label: "Aug", count: 0 },
  { label: "Sep", count: 0 },
  { label: "Oct", count: 0 },
  { label: "Nov", count: 0 },
  { label: "Dec", count: 0 },
];

const SubscriptionChart = () => {
  const { data: preferenceCardsData, isLoading } =
    useGetActiveSubscriptionsMonthlyQuery(null);
  const data = preferenceCardsData?.data || mockData;

  return (
    <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] h-full">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-lg font-bold text-gray-900">
            Active Subscription
          </h3>
        </div>
      </div>

      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
            barSize={30}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={true}
              horizontal={true}
              stroke="#E5E7EB"
            />
            <XAxis
              dataKey="label"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#6B7280", fontSize: 12 }}
              dy={10}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#6B7280", fontSize: 12 }}
            />
            <Tooltip
              cursor={{ fill: "transparent" }}
              contentStyle={{
                backgroundColor: "#fff",
                borderRadius: "8px",
                border: "1px solid #E5E7EB",
                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
              }}
            />
            <Bar dataKey="count" fill="#9945FF" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="text-center mt-4 flex justify-center items-center gap-2">
        <div className="w-3 h-3 bg-[#9945FF] rounded-sm"></div>
        <span className="text-[#9945FF] text-sm font-medium">Subscription</span>
      </div>
    </div>
  );
};

export default SubscriptionChart;
