import React from "react";
import { Download } from "lucide-react";
import { ProcedureStat } from "@/types/interface";

interface PopularProceduresListProps {
  procedures: ProcedureStat[];
}

const PopularProceduresList: React.FC<PopularProceduresListProps> = ({
  procedures,
}) => {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-gray-50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h3 className="text-lg font-bold text-gray-900">
          Most Popular Procedures
        </h3>
        <button className="flex items-center justify-center gap-2 bg-[#9945FF] hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors shadow-md shadow-purple-100">
          <Download size={16} />
          <span>Export Report</span>
        </button>
      </div>

      {/* List */}
      <div className="p-2">
        {procedures.map((proc) => (
          <div
            key={proc.id}
            className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg transition-colors"
          >
            <div className="flex items-center gap-4">
              {/* Rank Badge */}
              <div className="w-10 h-10 rounded-lg bg-purple-50 flex items-center justify-center text-[#9945FF] font-bold text-lg">
                {proc.rank}
              </div>

              {/* Content */}
              <div>
                <h4 className="font-bold text-gray-900">{proc.name}</h4>
                <p className="text-sm text-gray-500">{proc.specialty}</p>
              </div>
            </div>

            {/* Stats */}
            <div className="text-right">
              <div className="text-xl font-bold text-gray-900">
                {proc.downloads}
              </div>
              <p className="text-xs text-gray-500">downloads</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularProceduresList;
