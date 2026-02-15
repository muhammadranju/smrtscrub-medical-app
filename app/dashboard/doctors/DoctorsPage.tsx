"use client";

import PageHeader from "@/components/dashboard/PageHeader";
import { Doctor } from "@/types/interface";
import {
  CheckCircle2,
  Clock,
  Filter,
  Pencil,
  Search,
  SquarePen,
  Trash2,
  XCircle,
} from "lucide-react";
import AddDoctorModal from "./AddDoctorModal";
import EditDoctorModal from "./EditDoctorModal";
import { useListAllUsersQuery } from "@/lib/redux/features/api/users/userApiSlice";
import { useEffect, useState } from "react";
import {
  useDeleteDoctorProfileMutation,
  useUpdateDoctorProfileStatusMutation,
} from "@/lib/redux/features/api/doctors/doctorsApiSlice";
import { toast } from "sonner";
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
import { Button } from "@/components/ui/button";

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

interface Doctors {
  _id: string;
  name: string;
  email: string;
  profilePicture: string;
  role: string;
  specialty: string;
  hospital: string;
  status: string;
  cards: number;
  subscription: string;
  createdAt?: string;
  updatedAt?: string;
}
const DoctorsPage = () => {
  const [doctors, setDoctors] = useState<Doctors[]>([]);

  const { data: usersData, isLoading, refetch } = useListAllUsersQuery(null);
  const doctorsData = usersData?.data || [];

  console.log(doctorsData);

  useEffect(() => {
    setDoctors(doctorsData);
  }, [doctorsData]);

  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const filteredDoctors = doctors
    .filter((doctor) => {
      const query = searchQuery.toLowerCase();
      return (
        doctor.name.toLowerCase().includes(query) ||
        doctor.email.toLowerCase().includes(query) ||
        (doctor.specialty && doctor.specialty.toLowerCase().includes(query))
      );
    })
    .sort((a, b) => {
      // Try to sort by createdAt first
      const dateA = new Date(a.createdAt || 0).getTime();
      const dateB = new Date(b.createdAt || 0).getTime();

      if (dateA !== dateB) {
        return sortOrder === "newest" ? dateB - dateA : dateA - dateB;
      }

      // Fallback to _id if createdAt is missing or equal (MongoDB _ids are chronologically sortable)
      return sortOrder === "newest"
        ? b._id.localeCompare(a._id)
        : a._id.localeCompare(b._id);
    });

  const totalPages = Math.ceil(filteredDoctors.length / itemsPerPage);
  const paginatedDoctors = filteredDoctors.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  const [updateDoctorProfileStatus] = useUpdateDoctorProfileStatusMutation();
  const [deleteDoctorProfile] = useDeleteDoctorProfileMutation();

  const [alertOpen, setAlertOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctors | null>(null);
  const [actionType, setActionType] = useState<"delete" | "status" | null>(
    null,
  );

  const handleEditClick = (doctor: Doctors) => {
    setSelectedDoctor(doctor);
    setIsEditModalOpen(true);
  };

  const handleStatusChangeClick = (doctor: Doctors) => {
    setSelectedDoctor(doctor);
    setActionType("status");
    setAlertOpen(true);
  };

  const handleDeleteClick = (doctor: Doctors) => {
    setSelectedDoctor(doctor);
    setActionType("delete");
    setAlertOpen(true);
  };

  const handleConfirm = async () => {
    if (!selectedDoctor || !actionType) return;

    if (actionType === "status") {
      const result = await updateDoctorProfileStatus({
        userId: selectedDoctor._id,
        status: selectedDoctor.status === "ACTIVE" ? "RESTRICTED" : "ACTIVE",
      });
      if (result?.data.success) {
        refetch();
        toast.success("Doctor status updated successfully");
      }
      console.log(result);
    } else if (actionType === "delete") {
      const result = await deleteDoctorProfile({
        userId: selectedDoctor._id,
        status: "DELETED",
      });
      if (result?.data.success) {
        refetch();
        toast.success("Doctor deleted successfully");
      }
    }
    setAlertOpen(false);
    setSelectedDoctor(null);
    setActionType(null);
  };

  return (
    <>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <PageHeader
            title="Doctors"
            description="Manage doctors and their accounts"
          />
          {/* <AddDoctorModal /> */}
        </div>
        {/* Search and Filter Bar */}
        <div className="flex flex-col sm:flex-row gap-4 bg-white p-5 rounded-xl border">
          <div className="relative flex-1">
            <Search
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Search by name, email, or specialty..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-100 focus:border-[#9945FF] transition-all"
            />
          </div>
          <div className="relative">
            <Button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <Filter size={18} />
              <span>Filter</span>
            </Button>

            {isFilterOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 py-1 z-50">
                <button
                  className={`w-full text-left px-4 py-2 text-sm ${
                    sortOrder === "newest"
                      ? "bg-purple-50 text-[#9945FF]"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                  onClick={() => {
                    setSortOrder("newest");
                    setIsFilterOpen(false);
                  }}
                >
                  Newest First
                </button>
                <button
                  className={`w-full text-left px-4 py-2 text-sm ${
                    sortOrder === "oldest"
                      ? "bg-purple-50 text-[#9945FF]"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                  onClick={() => {
                    setSortOrder("oldest");
                    setIsFilterOpen(false);
                  }}
                >
                  Oldest First
                </button>
              </div>
            )}
          </div>
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
                {paginatedDoctors.map((doctor) => (
                  <tr
                    key={doctor._id}
                    className="hover:bg-gray-50/50 transition-colors group"
                  >
                    {/* Doctor Info */}
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-10 h-10 rounded-full  flex items-center justify-center text-white text-sm font-bold`}
                        >
                          <img src={doctor.profilePicture} alt="" />
                          {/* {doctor.initials} */}
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
                      {doctor.specialty || "N/A"}
                    </td>

                    {/* Hospital */}
                    <td className="py-4 px-6 text-sm text-gray-500">
                      {doctor.hospital || "N/A"}
                    </td>

                    {/* Status */}
                    <td className="py-4 px-6">
                      <span
                        className={`
                      inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium  lowercase
                      ${
                        doctor.status === "ACTIVE"
                          ? "bg-green-100 text-green-700 "
                          : "bg-red-100 text-red-700"
                      }
                    `}
                      >
                        {doctor.status}
                      </span>
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
                        {doctor.subscription || "N/A"}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="py-4 px-6">
                      <div className="flex items-center justify-end gap-3 opacity-60 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => handleEditClick(doctor)}
                          className="text-gray-500 hover:text-[#9945FF] transition-colors cursor-pointer"
                        >
                          <SquarePen size={18} />
                        </button>
                        <button
                          className={`${doctor.status === "ACTIVE" ? "text-red-500 hover:text-red-700" : "text-green-500 hover:text-green-700"} transition-colors cursor-pointer`}
                          onClick={() => {
                            handleStatusChangeClick(doctor);
                          }}
                        >
                          {doctor.status === "RESTRICTED" ? (
                            <CheckCircle2 size={18} />
                          ) : (
                            <XCircle size={18} />
                          )}
                        </button>
                        <button
                          onClick={() => handleDeleteClick(doctor)}
                          className="text-red-500 hover:text-red-700 transition-colors cursor-pointer"
                        >
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

        {/* Pagination */}
        <div className="flex items-center justify-end gap-2 mt-6">
          <Button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="flex items-center px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </Button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <Button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`w-10 h-10 flex items-center justify-center rounded-lg text-sm font-medium transition-colors ${
                currentPage === page
                  ? "bg-[#9945FF] text-white"
                  : "bg-white border border-gray-200 text-gray-700 hover:bg-gray-50"
              }`}
            >
              {page}
            </Button>
          ))}

          <Button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages || totalPages === 0}
            className="flex items-center px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </Button>
        </div>
      </div>

      <AlertDialog open={alertOpen} onOpenChange={setAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              {actionType === "delete"
                ? "This action cannot be undone. This will permanently delete the doctor's account and remove their data from our servers."
                : `This will change the doctor's status to ${
                    selectedDoctor?.status === "ACTIVE"
                      ? "Restricted"
                      : "Active"
                  }.`}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirm}
              className={` ${actionType === "delete" ? "text-red-50 hover:text-red-50 bg-red-500 hover:bg-red-600" : "text-green-50 hover:text-green-50 bg-green-500 hover:bg-green-600"}`}
            >
              {actionType === "delete" ? "Delete" : "Change Status"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <EditDoctorModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedDoctor(null);
        }}
        userId={selectedDoctor?._id || null}
        refetch={refetch}
      />
    </>
  );
};

export default DoctorsPage;
