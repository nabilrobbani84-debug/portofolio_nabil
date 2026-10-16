import type { Metadata } from "next";
import { Outfit } from "next/font/google"; // Using Outfit for futuristic look
import "./globals.css";
import StarCursor from "@/components/StarCursor";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import Preloader from "@/components/Preloader";
import { ThemeProvider } from "@/components/ThemeProvider";

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
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var stored = localStorage.getItem('portfolio_theme');
                  if (stored === 'dark') {
                    document.documentElement.classList.add('dark');
                  } else if (stored === 'light') {
                    document.documentElement.classList.remove('dark');
                  } else {
                    // Default to dark mode for cyberpunk aesthetic
                    document.documentElement.classList.add('dark');
                  }
                } catch (e) {
                  document.documentElement.classList.add('dark');
                }
              })();
            `,
          }}
        />
      </head>
      <body
        className={`${outfit.className} bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-white antialiased transition-colors duration-300`}
        suppressHydrationWarning
      >
        <ThemeProvider>
          <Preloader />
          <StarCursor />
          {children}
          <WhatsAppFloat />
        </ThemeProvider>
      </body>
    </html>
  );
}

