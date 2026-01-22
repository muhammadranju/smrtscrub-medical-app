"use client";
import PageHeader from "@/components/dashboard/PageHeader";
import { Check, FileText, MoreVertical, Users } from "lucide-react";
import { CreateSubscriptionModal } from "./CreateSubscriptionModal";

// Mock Data for Stats
const stats = [
  {
    label: "Total Card",
    value: "5",
    growth: "+12%",
    icon: Users,
    iconColor: "text-purple-600",
    iconBg: "bg-purple-100",
  },
  {
    label: "Total Subscription Amount",
    value: "4",
    growth: "+24%",
    icon: FileText,
    iconColor: "text-blue-600",
    iconBg: "bg-blue-100",
  },
];

// Mock Data for Plans
const plans = [
  {
    name: "Free",
    price: "$0",
    period: "/month",
    badge: null,
    features: [
      "2 basic preference cards",
      "No library access",
      "No calendar",
      "Email support",
    ],
  },
  {
    name: "Premium",
    price: "$5.99",
    period: "/month",
    badge: "Popular",
    features: [
      "20 preference cards",
      "basic calendar",
      "Access to public library (upload & download)",
      "No team collaboration",
      "No verified card",
    ],
  },
  {
    name: "Enterprise",
    price: "$9.99",
    period: "/month",
    badge: "Popular",
    features: [
      "Unlimited cards",
      "Advanced calendar",
      "Access to public library (upload & download)",
      "Team collaboration",
      "Verified preference cards",
    ],
  },
];

const SubscriptionsPage = () => {
  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <PageHeader
          title="Subscriptions"
          description="Welcome back, Admin. Here's your system overview."
        />
        <CreateSubscriptionModal />
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between"
          >
            <div>
              <div
                className={`w-12 h-12 rounded-xl ${stat.iconBg} flex items-center justify-center mb-4`}
              >
                <stat.icon className={`w-6 h-6 ${stat.iconColor}`} />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-gray-500">{stat.label}</div>
            </div>
            <div className="text-emerald-500 font-bold text-sm bg-emerald-50 px-2 py-1 rounded-md self-start">
              {stat.growth}
            </div>
          </div>
        ))}
      </div>

      {/* Plans Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {plans.map((plan, index) => (
          <div
            key={index}
            className={`bg-white rounded-2xl border border-gray-200 shadow-sm p-6 relative flex flex-col ${
              plan.name !== "Free" ? "border-purple-200 bg-purple-50/30" : ""
            }`}
          >
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-lg text-gray-900">{plan.name}</h3>
                {plan.badge && (
                  <span className="bg-emerald-400 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                    {plan.badge}
                  </span>
                )}
              </div>

              <button className="text-gray-400 hover:text-gray-600">
                <MoreVertical size={20} />
              </button>
            </div>

            <div className="flex items-baseline gap-1 mb-6">
              <span className="text-3xl font-bold text-gray-900">
                {plan.price}
              </span>
              <span className="text-gray-500 text-sm">{plan.period}</span>
            </div>

            <div className="space-y-3 flex-1">
              {plan.features.map((feature, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="mt-0.5 min-w-[16px]">
                    <div className="w-4 h-4 rounded-full border border-emerald-500 flex items-center justify-center">
                      <Check
                        size={10}
                        className="text-emerald-500"
                        strokeWidth={3}
                      />
                    </div>
                  </div>
                  <span className="text-sm text-gray-700 leading-snug">
                    {feature}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubscriptionsPage;
