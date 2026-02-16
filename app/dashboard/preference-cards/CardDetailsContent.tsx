/* eslint-disable react-hooks/static-components */
import React from "react";
import { Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DialogClose } from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
export interface Surgeon {
  fullName: string;
  handPreference: string;
  specialty: string;
  contactNumber: string;
  musicPreference: string;
}

export interface NamedItem {
  name: string;
}

export interface SurgicalCard {
  _id: string;
  createdBy: string;
  cardTitle: string;
  surgeon: Surgeon;
  medication: string;
  supplies: NamedItem[];
  sutures: NamedItem[];
  instruments: string;
  positioningEquipment: string;
  prepping: string;
  workflow: string;
  keyNotes: string;
  photoLibrary: unknown[]; // change to specific type if you know the structure
  downloadCount: number;
  published: boolean;
  verificationStatus: "UNVERIFIED" | "VERIFIED" | "REJECTED" | string;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  __v: number;
}

interface CardDetailsContentProps {
  onApprove: () => void;
  onReject: () => void;
  selectedCard: SurgicalCard | null;
  isLoading: boolean;
  isApproving: boolean;
  isRejecting: boolean;
}

const CardDetailsContent: React.FC<CardDetailsContentProps> = ({
  onApprove,
  onReject,
  selectedCard,
  isLoading,
  isApproving,
  isRejecting,
}) => {
  if (isLoading || !selectedCard) {
    return (
      <div className="flex flex-col max-h-[90vh] font-sans">
        <div className="flex-shrink-0 px-8 pt-8 pb-6">
          <Skeleton className="h-6 w-64 mb-2" />
          <Skeleton className="h-4 w-40 mb-1" />
          <Skeleton className="h-3 w-32" />
        </div>
        <div className="flex-shrink-0 px-8 py-5 border-y border-gray-100 flex items-center gap-12">
          <div>
            <Skeleton className="h-3 w-20 mb-2" />
            <Skeleton className="h-4 w-24" />
          </div>
          <div>
            <Skeleton className="h-3 w-24 mb-2" />
            <Skeleton className="h-4 w-16" />
          </div>
          <div>
            <Skeleton className="h-3 w-16 mb-2" />
            <Skeleton className="h-4 w-20" />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto px-8 py-6 space-y-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="space-y-2">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-10 w-full rounded-lg" />
            </div>
          ))}
        </div>
        <div className="flex-shrink-0 p-6 border-t border-gray-100 flex items-center gap-4">
          <Skeleton className="h-10 w-full rounded-lg" />
        </div>
      </div>
    );
  }

  const medications = selectedCard.medication ? [selectedCard.medication] : [];
  const supplies = selectedCard.supplies?.map((item) => item.name) || [];
  const sutures = selectedCard.sutures?.map((item) => item.name) || [];
  const instruments = selectedCard.instruments
    ? [selectedCard.instruments]
    : [];

  const createdDate = new Date(selectedCard.createdAt);
  const formattedDate = createdDate.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  const Section = ({ title, items }: { title: string; items: string[] }) => (
    <div className="mb-6">
      <h3 className="text-sm font-bold text-gray-900 mb-3">{title}</h3>
      <div className="space-y-2">
        {items.map((item, idx) => (
          <div
            key={idx}
            className="flex items-center gap-3 bg-gray-50/80 p-3 rounded-lg"
          >
            <div className="w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
              <span className="text-xs font-bold text-[#9945FF]">
                {idx + 1}
              </span>
            </div>
            <span className="text-sm text-gray-700 font-medium">{item}</span>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="flex flex-col max-h-[90vh] font-sans">
      {/* Fixed Header Section */}
      <div className="flex-shrink-0 px-8 pt-8 pb-6">
        <h2 className="text-2xl font-bold text-gray-900 leading-tight">
          {selectedCard.cardTitle}
        </h2>
        <div className="mt-1.5 flex flex-col gap-0.5">
          <p className="text-gray-500 font-medium">
            {selectedCard.surgeon.fullName}
          </p>
          <p className="text-sm text-gray-400">
            {selectedCard.surgeon.specialty}
          </p>
        </div>
      </div>

      {/* Fixed Stats Row */}
      <div className="flex-shrink-0 px-8 py-5 border-y border-gray-100 flex items-center gap-12">
        <div>
          <p className="text-[10px] uppercase tracking-wider font-bold text-gray-400 mb-1">
            CREATED
          </p>
          <p className="text-sm font-bold text-gray-900">{formattedDate}</p>
        </div>
        <div>
          <p className="text-[10px] uppercase tracking-wider font-bold text-gray-400 mb-1">
            DOWNLOADS
          </p>
          <p className="text-sm font-bold text-gray-900">
            {selectedCard.downloadCount}
          </p>
        </div>
        <div>
          <p className="text-[10px] uppercase tracking-wider font-bold text-gray-400 mb-1">
            STATUS
          </p>
          <p className="text-sm font-bold text-gray-900">
            {selectedCard.verificationStatus}
          </p>
        </div>
      </div>

      {/* Scrollable Content Area */}
      <div className="flex-1 overflow-y-auto px-8 py-6">
        <Section title="Medications" items={medications} />
        <Section title="Supplies" items={supplies} />
        <Section title="Sutures" items={sutures} />
        <Section title="Instruments" items={instruments} />

        {/* Extra content to demonstrate scrolling */}
        <Section
          title="Additional Equipment"
          items={["Monitor", "Insufflator"]}
        />
        <Section
          title="Patient Positioning"
          items={["Supine Position", "Arms Tucked"]}
        />
      </div>

      {/* Fixed Footer Actions */}
      <div className="flex-shrink-0 p-6 border-t border-gray-100 flex items-center gap-4">
        <DialogClose asChild>
          <Button
            onClick={onApprove}
            disabled={isApproving}
            className="flex-1 bg-[#00E599] hover:bg-[#00d08a] text-white font-bold py-3.5 px-4 rounded-lg transition-colors text-sm flex items-center justify-center gap-2"
          >
            <Check size={18} strokeWidth={3} />
            {isApproving ? "Approving..." : "Approve & Verify"}
          </Button>
        </DialogClose>
        <DialogClose asChild>
          <Button
            onClick={onReject}
            disabled={isRejecting}
            variant="outline"
            className="flex-1 text-red-600 border-red-200 hover:bg-red-50 font-bold py-3.5 px-4 rounded-lg transition-colors text-sm flex items-center justify-center gap-2"
          >
            <X size={18} strokeWidth={3} />
            {isRejecting ? "Rejecting..." : "Reject"}
          </Button>
        </DialogClose>
      </div>
    </div>
  );
};

export default CardDetailsContent;
