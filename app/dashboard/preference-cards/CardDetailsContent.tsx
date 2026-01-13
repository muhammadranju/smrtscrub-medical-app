/* eslint-disable react-hooks/static-components */
import React from "react";
import { Check } from "lucide-react";

interface CardDetailsContentProps {
  onApprove: () => void;
  onReject: () => void;
}

const CardDetailsContent: React.FC<CardDetailsContentProps> = ({
  onApprove,
  onReject,
}) => {
  const medications = ["Cefazolin 2g IV", "Ondansetron 4mg IV"];
  const supplies = ["Laparoscopic Instruments", "Trocars"];
  const sutures = ["3-0 Vicryl", "4-0 Monocryl"];
  const instruments = ["Laparoscopy Tower", "Graspers"];

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
    <div className="flex flex-col max-h-[80vh] font-sans">
      {/* Fixed Header Section */}
      <div className="flex-shrink-0 px-8 pt-8 pb-6">
        <h2 className="text-2xl font-bold text-gray-900 leading-tight">
          Laparoscopic Cholecystectomy
        </h2>
        <div className="mt-1.5 flex flex-col gap-0.5">
          <p className="text-gray-500 font-medium">Dr. Emily Rodriguez</p>
          <p className="text-sm text-gray-400">General Surgery</p>
        </div>
      </div>

      {/* Fixed Stats Row */}
      <div className="flex-shrink-0 px-8 py-5 border-y border-gray-100 flex items-center gap-12">
        <div>
          <p className="text-[10px] uppercase tracking-wider font-bold text-gray-400 mb-1">
            CREATED
          </p>
          <p className="text-sm font-bold text-gray-900">Jan 2, 2026</p>
        </div>
        <div>
          <p className="text-[10px] uppercase tracking-wider font-bold text-gray-400 mb-1">
            DOWNLOADS
          </p>
          <p className="text-sm font-bold text-gray-900">5</p>
        </div>
        <div>
          <p className="text-[10px] uppercase tracking-wider font-bold text-gray-400 mb-1">
            STATUS
          </p>
          <p className="text-sm font-bold text-gray-900">Pending</p>
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
          items={["Monitor", "Insufflator", "Light Source"]}
        />
        <Section
          title="Patient Positioning"
          items={["Supine Position", "Arms Tucked", "Safety Strap"]}
        />
      </div>

      {/* Fixed Footer Actions */}
      <div className="flex-shrink-0 p-6 border-t border-gray-100 flex items-center gap-4">
        <button
          onClick={onReject}
          className="flex-1 bg-red-50 hover:bg-red-100 text-red-500 font-bold py-3.5 px-4 rounded-lg transition-colors text-sm"
        >
          Reject Card
        </button>
        <button
          onClick={onApprove}
          className="flex-1 bg-[#00E599] hover:bg-[#00d08a] text-white font-bold py-3.5 px-4 rounded-lg transition-colors text-sm flex items-center justify-center gap-2"
        >
          <Check size={18} strokeWidth={3} />
          Approve & Verify
        </button>
      </div>
    </div>
  );
};

export default CardDetailsContent;
