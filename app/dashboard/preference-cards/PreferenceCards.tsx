"use client";

import PageHeader from "@/components/dashboard/PageHeader";
import { PreferenceCard } from "@/types/interface";
import { Check, MoreVertical, X } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import CardDetailsContent from "./CardDetailsContent";
import { useState } from "react";

// Preference Cards Data matched to image
const preferenceCards: PreferenceCard[] = [
  {
    id: "1",
    surgeonName: "Dr. Sarah Johnson",
    procedureName: "Total Hip Arthroplasty",
    specialty: "Orthopedic Surgery",
    status: "approved",
    verified: true,
    downloads: 45,
    created: "Dec 10, 2025",
  },
  {
    id: "2",
    surgeonName: "Dr. Michael Chen",
    procedureName: "Coronary Artery Bypass",
    specialty: "Cardiothoracic Surgery",
    status: "approved",
    verified: true,
    downloads: 32,
    created: "Dec 15, 2025",
  },
  {
    id: "3",
    surgeonName: "Dr. Emily Rodriguez",
    procedureName: "Laparoscopic Cholecystectomy",
    specialty: "General Surgery",
    status: "pending",
    verified: false,
    downloads: 5,
    created: "Jan 2, 2026",
  },
  {
    id: "4",
    surgeonName: "Dr. James Williams",
    procedureName: "Craniotomy for Tumor Resection",
    specialty: "Neurosurgery",
    status: "draft",
    verified: false,
    downloads: 2,
    created: "Nov 28, 2025",
  },
];

const PreferenceCardsList = () => {
  const [selectedCard, setSelectedCard] = useState<PreferenceCard | null>(null);

  const handleApprove = () => {
    console.log("Approved:", selectedCard);
    setSelectedCard(null);
  };

  const handleReject = () => {
    console.log("Rejected:", selectedCard);
    setSelectedCard(null);
  };

  return (
    <>
      <PageHeader
        title="Preference Cards"
        description="View and manage all surgical preference cards"
      />
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-100">
                <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Surgeon
                </th>
                <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Procedure
                </th>
                <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Specialty
                </th>
                <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider text-center">
                  Verified
                </th>
                <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Downloads
                </th>
                <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Created
                </th>
                <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {preferenceCards.map((card) => (
                <tr
                  key={card.id}
                  className="hover:bg-gray-50/50 transition-colors"
                >
                  {/* Surgeon */}
                  <td className="py-4 px-6">
                    <span className="font-bold text-gray-900 text-sm">
                      {card.surgeonName}
                    </span>
                  </td>

                  {/* Procedure */}
                  <td className="py-4 px-6 text-sm text-gray-900">
                    {card.procedureName}
                  </td>

                  {/* Specialty */}
                  <td className="py-4 px-6 text-sm text-gray-500">
                    {card.specialty}
                  </td>

                  {/* Status */}
                  <td className="py-4 px-6">
                    <span
                      className={`
                    inline-flex items-center px-3 py-1 rounded-full text-xs font-bold
                    ${
                      card.status === "approved"
                        ? "bg-green-100 text-green-700"
                        : card.status === "pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-gray-100 text-gray-700"
                    }
                  `}
                    >
                      {card.status}
                    </span>
                  </td>

                  {/* Verified Icon */}
                  <td className="py-4 px-6 text-center">
                    <div className="flex justify-center">
                      {card.verified ? (
                        <div className="h-6 w-6 rounded-full bg-green-50 flex items-center justify-center">
                          <Check
                            size={14}
                            className="text-green-500"
                            strokeWidth={3}
                          />
                        </div>
                      ) : (
                        <div className="h-6 w-6 rounded-full bg-gray-100 flex items-center justify-center">
                          <X
                            size={14}
                            className="text-gray-400"
                            strokeWidth={3}
                          />
                        </div>
                      )}
                    </div>
                  </td>

                  {/* Downloads */}
                  <td className="py-4 px-6 text-sm font-bold text-gray-900 pl-8">
                    {card.downloads}
                  </td>

                  {/* Created Date */}
                  <td className="py-4 px-6 text-sm text-gray-500">
                    {card.created}
                  </td>

                  {/* Actions */}
                  <td className="py-4 px-6 text-right">
                    <Dialog>
                      <DialogTrigger asChild>
                        <button
                          onClick={() => setSelectedCard(card)}
                          className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-full hover:bg-gray-100"
                        >
                          <MoreVertical size={20} />
                        </button>
                      </DialogTrigger>
                      <DialogContent className="p-0 overflow-hidden max-w-2xl">
                        <CardDetailsContent
                          onApprove={handleApprove}
                          onReject={handleReject}
                        />
                      </DialogContent>
                    </Dialog>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default PreferenceCardsList;
