"use client";

import { useGetPreferenceCardsMonthlyQuery } from "@/lib/redux/features/api/dashboard/dashboardApiSlice";
import React, { useEffect, useState } from "react";
import {
  Area,
  AreaChart,
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

const RevenueChart = () => {
  const { data: preferenceCardsData, isLoading } =
    useGetPreferenceCardsMonthlyQuery(null);
  const data = preferenceCardsData?.data || mockData;

  return (
    <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] h-full">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-lg font-bold text-gray-900">
            Total preference card create
          </h3>
        </div>
      </div>

      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10B981" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
              </linearGradient>
            </defs>
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
              contentStyle={{
                backgroundColor: "#fff",
                borderRadius: "8px",
                border: "1px solid #E5E7EB",
                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
              }}
              cursor={{ stroke: "#9CA3AF", strokeDasharray: "4 4" }}
            />
            <Area
              type="monotone"
              dataKey="count"
              stroke="url(#colorValue)"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#colorValue)"
            />
            {/* Overlay line for multiple gradient effect as seen in image is tricky with simple Area, 
                so we use a gradient stroke and fill. The image seems to have a yellow->green line.
                Let's try to match the stroke specifically.
             */}
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <div className="text-center mt-4 flex justify-center items-center gap-2">
        <div className="w-3 h-3 bg-[#9945FF] rounded-sm"></div>
        <span className="text-[#9945FF] text-sm font-medium">
          {" "}
          Preference Cards
        </span>
      </div>
    </div>
  );
};

export default RevenueChart;
