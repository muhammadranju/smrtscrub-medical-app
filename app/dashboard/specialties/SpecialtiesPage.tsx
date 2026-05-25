"use client";

import React, { useState } from "react";
import PageHeader from "@/components/dashboard/PageHeader";
import { 
  Plus, 
  Search, 
  Heart, 
  Baby, 
  Activity, 
  Dna, 
  MoreHorizontal,
  ChevronLeft,
  ChevronRight,
  Pencil,
  Trash2
} from "lucide-react";
import CreateSpecialtyModal from "@/app/dashboard/specialties/CreateSpecialtyModal";
import UpdateSpecialtyModal from "@/app/dashboard/specialties/UpdateSpecialtyModal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  useListSpecialtiesQuery,
  useDeleteSpecialtyMutation 
} from "@/lib/redux/features/api/specialties/specialtyApiSlice";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface Specialty {
  id: string;
  name: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

const SpecialtiesPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedSpecialty, setSelectedSpecialty] = useState<Specialty | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [specialtyToDelete, setSpecialtyToDelete] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const { data: specialtiesResponse, isLoading } = useListSpecialtiesQuery({
    page: currentPage,
    limit: 10,
    searchTerm: searchQuery,
  });

  const [deleteSpecialty] = useDeleteSpecialtyMutation();

  const specialties = specialtiesResponse?.data || [];
  const meta = specialtiesResponse?.meta || { total: 0, totalPages: 1 };

  const handleEditClick = (specialty: Specialty) => {
    setSelectedSpecialty(specialty);
    setIsUpdateModalOpen(true);
  };

  const openDeleteDialog = (id: string) => {
    setSpecialtyToDelete(id);
    setIsDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!specialtyToDelete) return;
    try {
      await deleteSpecialty(specialtyToDelete).unwrap();
      toast.success("Specialty deleted successfully");
      setIsDeleteDialogOpen(false);
      setSpecialtyToDelete(null);
    } catch (error) {
      toast.error("Failed to delete specialty");
    }
  };

  const stats = [
    { label: "Total Specialties", value: meta.total || 0, color: "text-blue-600" },
    { label: "Active Status", value: specialties.filter((s: any) => s.isActive).length || 0, color: "text-black" },
    { label: "Archived", value: specialties.filter((s: any) => !s.isActive).length || 0, color: "text-black" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <PageHeader 
          title="Medical Specialties" 
          description="Configure and manage clinical departments within the system." 
        />
        <Button 
          onClick={() => setIsModalOpen(true)}
          className="bg-[#0047FF] hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 font-semibold"
        >
          <Plus size={20} />
          Create Specialty
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {stats.map((stat, index) => (
          <div 
            key={index} 
            className={`p-6 rounded-xl border border-gray-100 bg-white shadow-sm`}
          >
            <p className="text-sm font-medium text-gray-500 mb-2">{stat.label}</p>
            <p className={`text-3xl font-bold ${stat.color}`}>{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/50">
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Specialty Name</th>
            
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {isLoading ? (
                Array.from({ length: 5 }).map((_, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4"><Skeleton className="h-6 w-32" /></td>
                    <td className="px-6 py-4"><Skeleton className="h-6 w-20" /></td>
                    <td className="px-6 py-4 text-right"><Skeleton className="h-6 w-16 ml-auto" /></td>
                  </tr>
                ))
              ) : specialties.length === 0 ? (
                <tr>
                  <td colSpan={3} className="px-6 py-10 text-center text-gray-500">
                    No specialties found
                  </td>
                </tr>
              ) : (
                specialties.map((specialty: any) => (
                  <tr key={specialty.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <span className="font-semibold text-gray-900">{specialty.name}</span>
                      </div>
                    </td>
                
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                        specialty.isActive 
                          ? "bg-green-100 text-green-700" 
                          : "bg-red-100 text-red-700"
                      }`}>
                        {specialty.isActive ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button 
                          onClick={() => handleEditClick(specialty)}
                          className="text-blue-600 hover:text-blue-800 transition-colors p-2 hover:bg-blue-50 rounded-lg" 
                          title="Edit Specialty"
                        >
                          <Pencil size={18} strokeWidth={2.5} />
                        </button>
                        <button 
                          onClick={() => openDeleteDialog(specialty.id)}
                          className="text-red-600 hover:text-red-800 transition-colors p-2 hover:bg-red-50 rounded-lg" 
                          title="Delete Specialty"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between text-sm text-gray-500">
          <span>Showing {specialties.length} of {meta.total} specialties</span>
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-1 rounded border border-gray-200 hover:bg-gray-50 disabled:opacity-50"
            >
              <ChevronLeft size={16} />
            </button>
            <button 
              onClick={() => setCurrentPage(p => Math.min(meta.totalPages, p + 1))}
              disabled={currentPage === meta.totalPages}
              className="p-1 rounded border border-gray-200 hover:bg-gray-50 disabled:opacity-50"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>

      <CreateSpecialtyModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />

      <UpdateSpecialtyModal 
        isOpen={isUpdateModalOpen} 
        onClose={() => setIsUpdateModalOpen(false)} 
        specialty={selectedSpecialty}
      />

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the specialty from the system.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setSpecialtyToDelete(null)}>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleConfirmDelete}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default SpecialtiesPage;
