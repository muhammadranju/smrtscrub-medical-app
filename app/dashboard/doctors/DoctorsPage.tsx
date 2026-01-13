"use client";

import PageHeader from "@/components/dashboard/PageHeader";
import { Doctor } from "@/types/interface";
import {
  CheckCircle2,
  Clock,
  Filter,
  Pencil,
  Search,
  Trash2,
  XCircle,
} from "lucide-react";
import AddDoctorModal from "./AddDoctorModal";

// Doctors Data matched to image
const doctors: Doctor[] = [
  {
    id: "1",
    initials: "DSJ",
    name: "Dr. Sarah Johnson",
    email: "sarah.johnson@hospital.com",
    specialty: "Orthopedic Surgery",
    hospital: "City General Hospital",
    status: "active",
    verification: "Verified",
    cards: 12,
    subscription: "Premium",
    avatarColor: "bg-[#9945FF]",
  },
  {
    id: "2",
    initials: "DMC",
    name: "Dr. Michael Chen",
    email: "michael.chen@hospital.com",
    specialty: "Cardiothoracic Surgery",
    hospital: "Metro Medical Center",
    status: "active",
    verification: "Verified",
    cards: 8,
    subscription: "Enterprise",
    avatarColor: "bg-[#9945FF]",
  },
  {
    id: "3",
    initials: "DER",
    name: "Dr. Emily Rodriguez",
    email: "emily.rodriguez@hospital.com",
    specialty: "General Surgery",
    hospital: "University Hospital",
    status: "active",
    verification: "Pending",
    cards: 2,
    subscription: "Free",
    avatarColor: "bg-[#9945FF]",
  },
  {
    id: "4",
    initials: "DJW",
    name: "Dr. James Williams",
    email: "james.williams@hospital.com",
    specialty: "Neurosurgery",
    hospital: "Regional Medical Center",
    status: "suspended",
    verification: "Verified",
    cards: 5,
    subscription: "Free",
    avatarColor: "bg-[#9945FF]",
  },
  {
    id: "5",
    initials: "DLA",
    name: "Dr. Lisa Anderson",
    email: "lisa.anderson@hospital.com",
    specialty: "Plastic Surgery",
    hospital: "Aesthetic Medical Institute",
    status: "active",
    verification: "Verified",
    cards: 15,
    subscription: "Premium",
    avatarColor: "bg-[#9945FF]",
  },
];

const DoctorsPage = () => {
  return (
    <>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <PageHeader
            title="Doctors"
            description="Manage doctors and their accounts"
          />
          <AddDoctorModal />
        </div>
        {/* Search and Filter Bar */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Search by name, email, or specialty..."
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-100 focus:border-[#9945FF] transition-all"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
            <Filter size={18} />
            <span>Filter</span>
          </button>
        </div>

        {/* Table Container */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50/50 border-b border-gray-100">
                  <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Doctor
                  </th>
                  <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Specialty
                  </th>
                  <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Hospital
                  </th>
                  <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Verification
                  </th>
                  <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Cards
                  </th>
                  <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Subscription
                  </th>
                  <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {doctors.map((doctor) => (
                  <tr
                    key={doctor.id}
                    className="hover:bg-gray-50/50 transition-colors group"
                  >
                    {/* Doctor Info */}
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-10 h-10 rounded-full ${doctor.avatarColor} flex items-center justify-center text-white text-sm font-bold`}
                        >
                          {doctor.initials}
                        </div>
                        <div>
                          <div className="font-bold text-gray-900 text-sm">
                            {doctor.name}
                          </div>
                          <div className="text-xs text-gray-500">
                            {doctor.email}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Specialty */}
                    <td className="py-4 px-6 text-sm text-gray-700">
                      {doctor.specialty}
                    </td>

                    {/* Hospital */}
                    <td className="py-4 px-6 text-sm text-gray-500">
                      {doctor.hospital}
                    </td>

                    {/* Status */}
                    <td className="py-4 px-6">
                      <span
                        className={`
                      inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize
                      ${
                        doctor.status === "active"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }
                    `}
                      >
                        {doctor.status}
                      </span>
                    </td>

                    {/* Verification */}
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-1.5">
                        {doctor.verification === "Verified" ? (
                          <>
                            <CheckCircle2
                              size={16}
                              className="text-green-500"
                            />
                            <span className="text-sm font-medium text-green-600">
                              Verified
                            </span>
                          </>
                        ) : (
                          <>
                            <Clock size={16} className="text-gray-400" />
                            <span className="text-sm font-medium text-gray-500">
                              Pending
                            </span>
                          </>
                        )}
                      </div>
                    </td>

                    {/* Cards */}
                    <td className="py-4 px-6 text-sm font-bold text-gray-900 pl-8">
                      {doctor.cards}
                    </td>

                    {/* Subscription */}
                    <td className="py-4 px-6">
                      <span
                        className={`
                      inline-flex items-center px-3 py-1 rounded-full text-xs font-medium
                      ${
                        doctor.subscription === "Premium"
                          ? "bg-blue-100 text-blue-700"
                          : doctor.subscription === "Enterprise"
                          ? "bg-orange-100 text-orange-800"
                          : "bg-gray-100 text-gray-700"
                      }
                    `}
                      >
                        {doctor.subscription}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="py-4 px-6">
                      <div className="flex items-center justify-end gap-3 opacity-60 group-hover:opacity-100 transition-opacity">
                        <button className="text-gray-500 hover:text-[#9945FF] transition-colors">
                          <Pencil size={18} />
                        </button>
                        <button className="text-red-500 hover:text-red-700 transition-colors">
                          {doctor.status === "suspended" ? (
                            <CheckCircle2 size={18} />
                          ) : (
                            <XCircle size={18} />
                          )}
                        </button>
                        <button className="text-red-500 hover:text-red-700 transition-colors">
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default DoctorsPage;
