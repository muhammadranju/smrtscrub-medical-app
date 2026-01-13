import React, { useState } from "react";
import { X, User, UserPlus } from "lucide-react";

export default function AddDoctorModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    specialty: "",
    hospital: "",
    phone: "",
    subscription: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    console.log("Doctor data:", formData);
    setIsOpen(false);
    // Reset form
    setFormData({
      name: "",
      email: "",
      specialty: "",
      hospital: "",
      phone: "",
      subscription: "",
    });
  };

  return (
    <>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="py-3 px-5   bg-[#9945FF] text-white rounded-lg text-sm font-semibold transition-colors shadow-md shadow-purple-100 flex items-center justify-center gap-2 cursor-pointer"
      >
        <UserPlus /> Add Doctor
      </button>

      {/* Modal Overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          {/* Modal Content */}
          <div className="bg-white rounded-2xl w-full max-w-xl shadow-2xl">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900">Add Doctor</h2>
              <button
                onClick={() => setIsOpen(false)}
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
                  <User className="text-white" size={24} />
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
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9945FF] focus:border-transparent"
                  placeholder="Enter phone number"
                />
              </div>

              {/* Subscription */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Subscription
                </label>
                <input
                  type="text"
                  name="subscription"
                  value={formData.subscription}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9945FF] focus:border-transparent"
                  placeholder="Enter subscription type"
                />
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-100">
              <button
                onClick={() => setIsOpen(false)}
                className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="px-6 py-3 bg-[#9945FF] text-white rounded-lg font-medium hover:bg-[#8534E6] transition-colors"
              >
                Add Doctor
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
