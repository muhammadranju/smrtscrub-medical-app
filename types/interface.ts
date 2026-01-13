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

export interface ProcedureStat {
  id: number;
  rank: number;
  name: string;
  specialty: string;
  downloads: number;
}

export interface SettingItem {
  id: string;
  label: string;
  enabled: boolean;
}

export interface SettingSection {
  id: string;
  title: string;
  items: SettingItem[];
}

export interface Subscription {
  id: string;
  user: {
    name: string;
    email: string;
    initials: string;
    avatarColor: string;
  };
  plan: "Enterprise" | "Premium" | "Free";
  status: "Active" | "Past Due" | "Cancelled";
  billingCycle: "Monthly" | "Yearly";
  amount: string;
  nextBilling: string;
}
