"use client";
import PageHeader from "@/components/dashboard/PageHeader";
// import React from "react";

// function SubscriptionsPage() {
//   return <div></div>;
// }

// export default SubscriptionsPage;

import { Subscription } from "@/types/interface";
import {
  Calendar,
  Download,
  Filter,
  MoreHorizontal,
  Search,
} from "lucide-react";

const subscriptions: Subscription[] = [
  {
    id: "sub-1",
    user: {
      name: "Dr. Sarah Johnson",
      email: "sarah.j@stmarys.com",
      initials: "SJ",
      avatarColor: "bg-emerald-500",
    },
    plan: "Enterprise",
    status: "Active",
    billingCycle: "Yearly",
    amount: "$1,299.00",
    nextBilling: "Dec 12, 2026",
  },
  {
    id: "sub-2",
    user: {
      name: "Dr. Michael Chen",
      email: "m.chen@orthocare.com",
      initials: "MC",
      avatarColor: "bg-blue-500",
    },
    plan: "Premium",
    status: "Active",
    billingCycle: "Monthly",
    amount: "$49.00",
    nextBilling: "Jan 15, 2026",
  },
  {
    id: "sub-3",
    user: {
      name: "Dr. James Wilson",
      email: "jwilson@gmail.com",
      initials: "JW",
      avatarColor: "bg-indigo-500",
    },
    plan: "Free",
    status: "Active",
    billingCycle: "Monthly",
    amount: "$0.00",
    nextBilling: "—",
  },
  {
    id: "sub-4",
    user: {
      name: "Dr. Emily Davis",
      email: "edavis@surgery.org",
      initials: "ED",
      avatarColor: "bg-rose-500",
    },
    plan: "Premium",
    status: "Past Due",
    billingCycle: "Monthly",
    amount: "$49.00",
    nextBilling: "Dec 28, 2025",
  },
  {
    id: "sub-5",
    user: {
      name: "Dr. Robert Taylor",
      email: "rtaylor@clinic.net",
      initials: "RT",
      avatarColor: "bg-amber-500",
    },
    plan: "Enterprise",
    status: "Cancelled",
    billingCycle: "Yearly",
    amount: "$1,299.00",
    nextBilling: "Nov 10, 2025",
  },
  {
    id: "sub-6",
    user: {
      name: "Dr. Lisa Anderson",
      email: "landerson@medgroup.com",
      initials: "LA",
      avatarColor: "bg-purple-500",
    },
    plan: "Premium",
    status: "Active",
    billingCycle: "Monthly",
    amount: "$49.00",
    nextBilling: "Jan 02, 2026",
  },
];

const SubscriptionsPage = () => {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Subscriptions"
        description="Welcome back, Admin. Here's your system overview."
      />
      {/* Filters and Actions Bar */}
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="flex flex-col sm:flex-row gap-4 flex-1">
          <div className="relative flex-1 max-w-md">
            <Search
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Search subscribers..."
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-100 focus:border-[#9945FF] transition-all"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
            <Filter size={18} />
            <span>Filter</span>
          </button>
        </div>
        <button className="flex items-center justify-center gap-2 bg-[#9945FF] hover:bg-purple-700 text-white px-4 py-2.5 rounded-lg text-sm font-semibold transition-colors shadow-md shadow-purple-100">
          <Download size={18} />
          <span>Export CSV</span>
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-100">
                <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  User
                </th>
                <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Plan
                </th>
                <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Billing
                </th>
                <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Next Invoice
                </th>
                <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {subscriptions.map((sub) => (
                <tr
                  key={sub.id}
                  className="hover:bg-gray-50/50 transition-colors"
                >
                  {/* User */}
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-9 h-9 rounded-full ${sub.user.avatarColor} flex items-center justify-center text-white text-xs font-bold`}
                      >
                        {sub.user.initials}
                      </div>
                      <div>
                        <div className="font-bold text-gray-900 text-sm">
                          {sub.user.name}
                        </div>
                        <div className="text-xs text-gray-500">
                          {sub.user.email}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Plan Badge */}
                  <td className="py-4 px-6">
                    <span
                      className={`
                      inline-flex items-center px-2.5 py-1 rounded-md text-xs font-bold border
                      ${
                        sub.plan === "Enterprise"
                          ? "bg-purple-50 text-[#9945FF] border-purple-100"
                          : sub.plan === "Premium"
                          ? "bg-blue-50 text-blue-600 border-blue-100"
                          : "bg-gray-50 text-gray-600 border-gray-200"
                      }
                    `}
                    >
                      {sub.plan}
                    </span>
                  </td>

                  {/* Status */}
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-2 h-2 rounded-full ${
                          sub.status === "Active"
                            ? "bg-emerald-500"
                            : sub.status === "Past Due"
                            ? "bg-amber-500"
                            : "bg-red-500"
                        }`}
                      />
                      <span
                        className={`text-sm font-medium ${
                          sub.status === "Active"
                            ? "text-gray-700"
                            : sub.status === "Past Due"
                            ? "text-amber-600"
                            : "text-gray-500"
                        }`}
                      >
                        {sub.status}
                      </span>
                    </div>
                  </td>

                  {/* Billing Cycle */}
                  <td className="py-4 px-6 text-sm text-gray-600">
                    {sub.billingCycle}
                  </td>

                  {/* Amount */}
                  <td className="py-4 px-6 text-sm font-bold text-gray-900">
                    {sub.amount}
                  </td>

                  {/* Next Invoice */}
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2 text-gray-500 text-sm">
                      <Calendar size={14} />
                      <span>{sub.nextBilling}</span>
                    </div>
                  </td>

                  {/* Actions */}
                  <td className="py-4 px-6 text-right">
                    <button className="text-gray-400 hover:text-gray-600 transition-colors p-1.5 hover:bg-gray-100 rounded-md">
                      <MoreHorizontal size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionsPage;
