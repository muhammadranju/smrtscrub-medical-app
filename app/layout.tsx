import StoreProvider from "@/lib/redux/provider";
import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SmrtScrub ",
  description: "Medical app dashboard",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <StoreProvider>{children}</StoreProvider>
      </body>
    </html>
  );
}
