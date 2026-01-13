import { LucideIcon } from "lucide-react";

export interface NavItem {
  label: string;
  icon: LucideIcon;
  href: string;
  isActive?: boolean;
}

export interface StatData {
  id: number;
  label: string;
  value: string | number;
  percentage: string;
  icon: LucideIcon;
  iconColor: string; // Tailwind text color class
  iconBg: string; // Tailwind bg color class
}

export interface ActivityData {
  id: number;
  initials: string;
  name: string;
  lastActive: string;
  status: "active" | "suspended";
  avatarColor: string;
}

export interface Doctor {
  id: string;
  name: string;
  email: string;
  initials: string;
  specialty: string;
  hospital: string;
  status: "active" | "suspended";
  verification: "Verified" | "Pending";
  cards: number;
  subscription: "Premium" | "Enterprise" | "Free";
  avatarColor: string;
}

export interface PreferenceCard {
  id: string;
  surgeonName: string;
  procedureName: string;
  specialty: string;
  status: "approved" | "pending" | "draft";
  verified: boolean;
  downloads: number;
  created: string;
}
