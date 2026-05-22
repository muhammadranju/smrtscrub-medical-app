import StoreProvider from "@/lib/redux/provider";
import "./globals.css";
import type { Metadata } from "next";
import { Toaster } from "sonner";
import { Arimo } from "next/font/google";

const geistMono = Arimo({
  variable: "--font-arimo",
  subsets: ["latin"],
});

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
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistMono.variable} antialiased`}>
        <StoreProvider>
          <Toaster richColors />
          {children}
        </StoreProvider>
      </body>
    </html>
  );
}
