import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Emile Izere | Software Engineer",
  description: "Yale CS & Economics student. Building distributed systems and data infrastructure.",
  keywords: ["Emile Izere", "software engineer", "Yale", "computer science", "economics"],
  authors: [{ name: "Emile Izere" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
