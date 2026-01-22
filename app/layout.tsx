import type { Metadata } from "next";
import { Outfit } from "next/font/google"; // Using Outfit for futuristic look
import "./globals.css";
import StarCursor from "@/components/StarCursor";

const outfit = Outfit({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Nabil Robbani | Future-Ready Software Engineer",
  description: "Portfolio of Nabil Robbani, a dedicated Software Engineer specialized in Frontend & Fullstack Development.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${outfit.className} bg-slate-950 text-white antialiased`}>
        <StarCursor />
        {children}
      </body>
    </html>
  );
}
