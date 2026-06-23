import type { Metadata } from "next";
import "../globals.css";

export const metadata: Metadata = {
  title: "CoWork Spaces - Booking System",
  description: "Book your perfect meeting room",
};

export default function BookingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-gradient-to-br from-blue-50 to-teal-50">
        {children}
      </body>
    </html>
  );
}
