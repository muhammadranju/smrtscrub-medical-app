"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { useCreateSpecialtyMutation } from "@/lib/redux/features/api/specialties/specialtyApiSlice";
import { toast } from "sonner";
import { Loader2, X } from "lucide-react";

interface CreateSpecialtyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreateSpecialtyModal: React.FC<CreateSpecialtyModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [name, setName] = React.useState("");
  const [createSpecialty, { isLoading }] = useCreateSpecialtyMutation();

  const handleSave = async () => {
    if (!name.trim()) {
      toast.error("Please enter a specialty name");
      return;
    }

    try {
      await createSpecialty({ name }).unwrap();
      toast.success("Specialty created successfully");
      setName("");
      onClose();
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to create specialty");
    }
  };
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent 
        showCloseButton={false}
        className="sm:max-w-[450px] p-8 relative"
      >
        <DialogClose asChild>
          <button className="absolute right-6 top-6 z-10 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-all outline-none">
            <X size={20} />
          </button>
        </DialogClose>
        <DialogHeader className="space-y-3">
          <DialogTitle className="text-2xl font-bold text-gray-900">
            Create Specialty
          </DialogTitle>
          <DialogDescription className="text-gray-500 text-sm leading-relaxed">
            Add a new clinical department or medical specialization to the registry.
          </DialogDescription>
        </DialogHeader>

        <div className="py-6 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-xs font-bold text-gray-500 uppercase tracking-wider">
              NAME
            </Label>
            <Input
              id="name"
              placeholder="e.g. Cardiovascular Surgery"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="h-12 border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-lg"
            />
          </div>
        </div>

        <DialogFooter className="flex items-center gap-4 sm:justify-end">
          <button
            onClick={onClose}
            disabled={isLoading}
            className="text-gray-500 hover:text-gray-700 font-medium text-sm px-4 py-2 disabled:opacity-50"
          >
            Cancel
          </button>
          <Button
            onClick={handleSave}
            disabled={isLoading}
            className="bg-[#0047FF] hover:bg-blue-700 text-white px-6 py-2 h-12 rounded-lg font-semibold disabled:opacity-50"
          >
            {isLoading ? <Loader2 className="animate-spin" size={20} /> : "Save Specialty"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateSpecialtyModal;
