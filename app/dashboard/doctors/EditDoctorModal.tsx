import React, { useEffect, useState } from "react";
import { X, User } from "lucide-react";
import {
  useGetDoctorProfileQuery,
  useUpdateDoctorProfileMutation,
} from "@/lib/redux/features/api/doctors/doctorsApiSlice";
import { toast } from "sonner";

interface EditDoctorModalProps {
  userId: string | null;
  isOpen: boolean;
  onClose: () => void;
  refetch?: () => void;
}

export default function EditDoctorModal({
  userId,
  isOpen,
  onClose,
  refetch,
}: EditDoctorModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    specialty: "",
    hospital: "",
    phone: "",
  });

  const { data: doctorData, isSuccess } = useGetDoctorProfileQuery(
    { userId },
    { skip: !userId },
  );

  const [updateDoctorProfile, { isLoading: isUpdating }] =
    useUpdateDoctorProfileMutation();

  useEffect(() => {
    if (isSuccess && doctorData?.data) {
      const doctor = doctorData.data.user;
      setFormData({
        name: doctor.name || "",
        email: doctor.email || "",
        specialty: doctor.specialty || "",
        hospital: doctor.hospital || "",
        phone: doctor.phone || "",
      });
    }
  }, [doctorData, isSuccess, userId]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    if (!userId) return;

    try {
      const result = await updateDoctorProfile({
        userId,
        ...formData,
      }).unwrap();

      if (result.success) {
        toast.success("Doctor profile updated successfully");
        if (refetch) refetch();
        onClose();
      } else {
        toast.error(result.message || "Failed to update profile");
      }
    } catch (error) {
      console.error("Failed to update doctor:", error);
      toast.error("An error occurred while updating the profile");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      {/* Modal Content */}
      <div className="bg-white rounded-2xl w-full max-w-xl shadow-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100 sticky top-0 bg-white z-10">
          <h2 className="text-2xl font-bold text-gray-900">Edit Doctor</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Form */}
        <div className="p-6 space-y-5">
          {/* Profile Picture & Name */}
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-[#9945FF] flex items-center justify-center flex-shrink-0 mt-6">
              {doctorData?.data?.profilePicture ? (
                <img
                  src={doctorData.data.profilePicture}
                  alt={formData.name}
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                <User className="text-white" size={24} />
              )}
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9945FF] focus:border-transparent"
                placeholder="Enter doctor name"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9945FF] focus:border-transparent"
              placeholder="Enter email address"
            />
          </div>

          {/* Specialty */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Specialty
            </label>
            <input
              type="text"
              name="specialty"
              value={formData.specialty}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9945FF] focus:border-transparent"
              placeholder="Enter specialty"
            />
          </div>

          {/* Hospital */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Hospital
            </label>
            <input
              type="text"
              name="hospital"
              value={formData.hospital}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9945FF] focus:border-transparent"
              placeholder="Enter hospital name"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Phone
            </label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9945FF] focus:border-transparent"
              placeholder="Enter phone number"
            />
          </div>

          {/* Buttons */}
          <div className="flex items-center justify-end gap-3 pt-4">
            <button
              onClick={onClose}
              className="px-6 py-2.5 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={isUpdating}
              className="px-6 py-2.5 text-sm font-medium text-white bg-[#9945FF] rounded-lg hover:bg-[#8834ee] transition-colors shadow-lg shadow-purple-200 disabled:opacity-50"
            >
              {isUpdating ? "Updating..." : "Update Doctor"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
