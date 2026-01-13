import React, { useState } from "react";
import {
  X,
  FileText,
  CheckCircle,
  UserPlus,
  AlertCircle,
  Trash2,
} from "lucide-react";

interface Notification {
  id: string;
  type:
    | "card_submitted"
    | "card_approved"
    | "user_registered"
    | "system_update";
  title: string;
  message: string;
  time: string;
  isRead: boolean;
}

interface NotificationPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NotificationPopup: React.FC<NotificationPopupProps> = ({
  isOpen,
  onClose,
}) => {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      type: "card_submitted",
      title: "New Preference Card Submitted",
      message:
        "Dr. Emily Rodriguez has submitted a new preference card for Laparoscopic Cholecystectomy",
      time: "3 hours ago",
      isRead: false,
    },
    {
      id: "2",
      type: "card_approved",
      title: "Preference Card Approved",
      message:
        "Dr. Sarah Johnson's Total Knee Replacement card has been approved",
      time: "1 day ago",
      isRead: true,
    },
    {
      id: "3",
      type: "user_registered",
      title: "New User Registered",
      message: "Dr. Michael Chen has registered on SMRTSCRUB",
      time: "2 days ago",
      isRead: false,
    },
    {
      id: "4",
      type: "system_update",
      title: "System Update Available",
      message:
        "A new system update is available. Please update your app to the latest version.",
      time: "3 days ago",
      isRead: false,
    },
  ]);

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  };

  const deleteNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const getIcon = (type: string) => {
    switch (type) {
      case "card_submitted":
        return <FileText className="text-purple-600" size={20} />;
      case "card_approved":
        return <CheckCircle className="text-green-500" size={20} />;
      case "user_registered":
        return <UserPlus className="text-blue-500" size={20} />;
      case "system_update":
        return <AlertCircle className="text-orange-500" size={20} />;
      default:
        return null;
    }
  };

  const getIconBg = (type: string) => {
    switch (type) {
      case "card_submitted":
        return "bg-purple-50";
      case "card_approved":
        return "bg-green-50";
      case "user_registered":
        return "bg-blue-50";
      case "system_update":
        return "bg-orange-50";
      default:
        return "bg-gray-50";
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/20 z-40" onClick={onClose} />

      {/* Popup Panel */}
      <div className="fixed top-20 right-4 w-full max-w-lg bg-white rounded-2xl shadow-2xl z-50 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-bold text-gray-900">Notifications</h2>
            {unreadCount > 0 && (
              <span className="bg-red-500 text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={markAllAsRead}
              className="text-purple-600 hover:text-purple-700 text-sm font-semibold transition-colors"
            >
              Mark All Read
            </button>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors p-1"
            >
              <X size={24} />
            </button>
          </div>
        </div>

        {/* Notifications List */}
        <div className="max-h-[calc(100vh-200px)] overflow-y-auto">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className={`px-6 py-4 border-b border-gray-100 hover:bg-gray-50 transition-colors ${
                !notification.isRead ? "bg-purple-50/30" : ""
              }`}
            >
              <div className="flex gap-4">
                {/* Icon */}
                <div
                  className={`w-10 h-10 rounded-full ${getIconBg(
                    notification.type
                  )} flex items-center justify-center flex-shrink-0`}
                >
                  {getIcon(notification.type)}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2">
                      {notification.title}
                      {!notification.isRead && (
                        <span className="w-2 h-2 bg-purple-600 rounded-full flex-shrink-0"></span>
                      )}
                    </h3>
                  </div>
                  <p className="text-sm text-gray-600 mb-2 leading-relaxed">
                    {notification.message}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-400">
                      {notification.time}
                    </span>
                    <div className="flex items-center gap-2">
                      {!notification.isRead && (
                        <button
                          onClick={() => markAsRead(notification.id)}
                          className="text-purple-600 hover:text-purple-700 text-xs font-semibold transition-colors"
                        >
                          Mark Read
                        </button>
                      )}
                      <button
                        onClick={() => deleteNotification(notification.id)}
                        className="text-red-500 hover:text-red-600 transition-colors p-1"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-100 bg-gray-50">
          <button className="w-full text-purple-600 hover:text-purple-700 font-semibold text-sm transition-colors">
            View All Notifications
          </button>
        </div>
      </div>
    </>
  );
};

export default NotificationPopup;
