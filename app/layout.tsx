import type { Metadata } from "next";
import { Outfit } from "next/font/google"; // Using Outfit for futuristic look
import "./globals.css";
import StarCursor from "@/components/StarCursor";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import Preloader from "@/components/Preloader";
import { ThemeProvider } from "@/components/ThemeProvider";
import { LanguageProvider } from "@/components/LanguageProvider";

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
    <html lang="id" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var storedTheme = localStorage.getItem('portfolio_theme');
                  if (storedTheme === 'dark') {
                    document.documentElement.classList.add('dark');
                  } else if (storedTheme === 'light') {
                    document.documentElement.classList.remove('dark');
                  } else {
                    document.documentElement.classList.add('dark');
                  }

                  var storedLang = localStorage.getItem('portfolio_lang');
                  if (storedLang === 'en' || storedLang === 'id') {
                    document.documentElement.lang = storedLang;
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
          <LanguageProvider>
            <Preloader />
            <StarCursor />
            {children}
            <WhatsAppFloat />
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

