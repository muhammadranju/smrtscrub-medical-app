"use client";
import PageHeader from "@/components/dashboard/PageHeader";
import { SettingSection } from "@/types/interface";

const settingsData: SettingSection[] = [
  {
    id: "permissions",
    title: "User Permissions",
    items: [
      {
        id: "p1",
        label: "Allow card creation for all verified doctors",
        enabled: true,
      },
      { id: "p2", label: "Enable public card sharing", enabled: true },
      { id: "p3", label: "Allow preference card downloads", enabled: true },
      {
        id: "p4",
        label: "Require admin approval for new users",
        enabled: true,
      },
    ],
  },
  {
    id: "notifications",
    title: "Notification Settings",
    items: [
      {
        id: "n1",
        label: "Email notifications for new user registrations",
        enabled: true,
      },
      { id: "n2", label: "Alert on new card submissions", enabled: true },
      { id: "n3", label: "Payment and subscription updates", enabled: true },
      { id: "n4", label: "System maintenance alerts", enabled: true },
    ],
  },
];

const SettingsPage = () => {
  return (
    <>
      <PageHeader
        title="App Settings"
        description="Configure application preferences and permissions"
      />
      <div className="space-y-8">
        {settingsData.map((section) => (
          <div
            key={section.id}
            className="bg-white rounded-xl border border-gray-100 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] overflow-hidden"
          >
            <div className="p-6 sm:p-8">
              <h3 className="text-lg font-bold text-gray-900 mb-6">
                {section.title}
              </h3>

              <div className="space-y-1">
                {section.items.map((item, index) => (
                  <div
                    key={item.id}
                    className={`flex items-center justify-between py-4 ${
                      index !== section.items.length - 1
                        ? "border-b border-gray-50"
                        : ""
                    }`}
                  >
                    <span className="text-sm font-medium text-gray-700">
                      {item.label}
                    </span>

                    {/* Toggle Switch */}
                    <button
                      className={`
                      relative inline-flex h-7 w-12 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent 
                      transition-colors duration-200 ease-in-out focus:outline-none 
                      ${item.enabled ? "bg-emerald-400" : "bg-gray-200"}
                    `}
                      role="switch"
                      aria-checked={item.enabled}
                    >
                      <span
                        aria-hidden="true"
                        className={`
                        pointer-events-none inline-block h-6 w-6 transform rounded-full bg-white shadow ring-0 
                        transition duration-200 ease-in-out
                        ${item.enabled ? "translate-x-5" : "translate-x-0"}
                      `}
                      />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default SettingsPage;
