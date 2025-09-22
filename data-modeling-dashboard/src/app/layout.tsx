import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "DMPro - Data Modeling Dashboard",
  description: "Professional data modeling platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  );
}