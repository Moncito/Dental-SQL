import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner"; // ✅ Add this import

// DM Sans font with CSS variable
const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-dm-sans",
});

export const metadata: Metadata = {
  title: "Dental Clinic",
  description: "A Dental Clinic Site made by Moncito The Great",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${dmSans.variable} antialiased bg-white text-gray-900`}
        style={{ fontFamily: "var(--font-dm-sans)" }}
      >
        {children}
        <Toaster richColors position="top-center" expand={true} /> {/* ✅ Toasts rendered here */}
      </body>
    </html>
  );
}
