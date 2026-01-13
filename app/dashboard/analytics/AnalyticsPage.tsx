"use client";

import AnalyticsStatCard from "@/components/dashboard/AnalyticsStatCard";
import PageHeader from "@/components/dashboard/PageHeader";
import PopularProceduresList from "@/components/dashboard/PopularProceduresList";
import { ProcedureStat } from "@/types/interface";
import { Activity, FileCheck, TrendingUp } from "lucide-react";

const AnalyticsPage = () => {
  const procedures: ProcedureStat[] = [
    {
      id: 1,
      rank: 1,
      name: "Total Hip Arthroplasty",
      specialty: "Orthopedic Surgery",
      downloads: 45,
    },
    {
      id: 2,
      rank: 2,
      name: "Coronary Artery Bypass",
      specialty: "Cardiothoracic Surgery",
      downloads: 32,
    },
    {
      id: 3,
      rank: 3,
      name: "Laparoscopic Cholecystectomy",
      specialty: "General Surgery",
      downloads: 5,
    },
    {
      id: 4,
      rank: 4,
      name: "Craniotomy for Tumor Resection",
      specialty: "Neurosurgery",
      downloads: 2,
    },
  ];

  return (
    <>
      <PageHeader
        title="Analytics & Reports"
        description="Track usage, trends, and insights"
      />

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <AnalyticsStatCard
          title="Total Activity"
          value="84"
          description="Card downloads this month"
          icon={Activity}
          iconColor="text-purple-600"
          iconBg="bg-purple-100"
        />
        <AnalyticsStatCard
          title="Growth Rate"
          value="+24%"
          description="User growth this quarter"
          icon={TrendingUp}
          iconColor="text-emerald-500"
          iconBg="bg-emerald-100"
        />
        <AnalyticsStatCard
          title="Approval Rate"
          value="94%"
          description="Cards approved successfully"
          icon={FileCheck}
          iconColor="text-blue-500"
          iconBg="bg-blue-100"
        />
      </div>

      {/* Procedures List */}
      <PopularProceduresList procedures={procedures} />
    </>
  );
};

export default AnalyticsPage;
