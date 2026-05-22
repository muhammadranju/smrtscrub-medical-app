import SidebarWrapper from "@/components/dashboard/SidebarWrapper";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard - SmrtScrub",
  description: "Dashboard layout",
};

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <SidebarWrapper>{children}</SidebarWrapper>;
}
