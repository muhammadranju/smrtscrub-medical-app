"use client";

import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUpdateSpecialtyMutation } from "@/lib/redux/features/api/specialties/specialtyApiSlice";
import { toast } from "sonner";
import { Loader2, ArrowLeft, FileEdit, Info, X } from "lucide-react";

interface Specialty {
  id: string;
  name: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

interface UpdateSpecialtyModalProps {
  isOpen: boolean;
  onClose: () => void;
  specialty: Specialty | null;
}

const UpdateSpecialtyModal: React.FC<UpdateSpecialtyModalProps> = ({
  isOpen,
  onClose,
  specialty,
}) => {
  const [name, setName] = useState("");
  const [isActive, setIsActive] = useState(true);

  const [updateSpecialty, { isLoading }] = useUpdateSpecialtyMutation();

  useEffect(() => {
    if (specialty) {
      setName(specialty.name);
      setIsActive(specialty.isActive);
    }
  }, [specialty]);

  const handleToggleStatus = async () => {
    if (!specialty) return;
    const newStatus = !isActive;
    setIsActive(newStatus);
    
    try {
      await updateSpecialty({
        specialtyId: specialty.id,
        isActive: newStatus,
      }).unwrap();
      toast.success(`Specialty ${newStatus ? 'activated' : 'deactivated'} successfully`);
    } catch (error: any) {
      setIsActive(!newStatus); // Revert if failed
      toast.error(error?.data?.message || "Failed to update status");
    }
  };

  const handleUpdate = async () => {
    if (!specialty) return;
    if (!name.trim()) {
      toast.error("Please enter a specialty name");
      return;
    }

    try {
      await updateSpecialty({
        specialtyId: specialty.id,
        name,
        isActive,
      }).unwrap();
      toast.success("Specialty updated successfully");
      onClose();
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to update specialty");
    }
  };

  if (!specialty) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent 
        showCloseButton={false}
        className="sm:max-w-[550px] p-0 border-none shadow-2xl bg-[#F8FAFC] relative"
      >
        <DialogClose asChild>
          <button 
            className="absolute right-6 top-6 z-10 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-all outline-none"
          >
            <X size={20} />
          </button>
        </DialogClose>
        <div className="p-8 space-y-6">
          <DialogHeader className="space-y-1">
            <DialogTitle className="text-3xl font-bold text-[#0F172A]">
              Update Specialty
            </DialogTitle>
            <DialogDescription className="text-gray-500 text-base">
              Modify clinical department details and visibility status.
            </DialogDescription>
          </DialogHeader>

          {/* Main Card */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
            {/* Specialty Identity Header */}
            <div className="p-6 border-b border-gray-50 flex items-center gap-4 bg-white">
              <div className="w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600">
                <FileEdit size={24} />
              </div>
              <div>
                <p className="text-[10px] font-bold text-blue-600 uppercase tracking-[0.2em]">
                  Specialty Identity
                </p>
                <p className="text-gray-500 font-medium">
                  Editing {specialty.name}
                </p>
              </div>
            </div>

            {/* Form Fields */}
            <div className="p-8 space-y-8">
              <div className="space-y-3">
                <Label htmlFor="edit-name" className="text-sm font-bold text-gray-900 flex items-center gap-1">
                  Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="edit-name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="h-12 border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-lg text-gray-900 font-medium"
                />
                <p className="text-xs text-gray-400 font-medium">
                  The formal name of the clinical specialty as it appears on patient records.
                </p>
              </div>

              {/* Toggle Section */}
              <div className="bg-[#F8FAFC] rounded-xl p-5 border border-gray-100 flex items-center justify-between">
                <div className="space-y-1">
                  <p className="font-bold text-gray-900">isActive</p>
                  <p className="text-sm text-gray-400 font-medium">
                    Toggle visibility for scheduling and user assignments
                  </p>
                </div>
                <button 
                  onClick={handleToggleStatus}
                  disabled={isLoading}
                  className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors focus:outline-none disabled:opacity-50 ${isActive ? 'bg-blue-600' : 'bg-gray-200'}`}
                >
                  <span
                    className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${isActive ? 'translate-x-6' : 'translate-x-1'}`}
                  />
                </button>
              </div>

              <div className="h-px bg-gray-100 w-full" />

              {/* Modal Footer */}
              <div className="flex items-center justify-end pt-2">
    
                <Button
                  onClick={handleUpdate}
                  disabled={isLoading}
                  className="bg-[#0047FF] hover:bg-blue-700 text-white px-8 py-2 h-12 rounded-lg font-bold shadow-lg shadow-blue-100 transition-all disabled:opacity-50"
                >
                  {isLoading ? <Loader2 className="animate-spin" size={20} /> : "Update Specialty"}
                </Button>
              </div>
            </div>
          </div>

   
         
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateSpecialtyModal;
