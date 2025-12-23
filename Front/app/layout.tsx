import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import Header from "./Components/Header";
import InteractiveFooter from "./Components/Footer";
import { Providers } from "./providers";
import { Toaster } from "sonner";
import ScrollToTop from "./Components/ScrollToTop";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`antialiased ${inter.variable} ${poppins.variable} bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 w-full font-sans transition-colors duration-300`}
      >
        <Providers>
          <Header />
          <main className="min-h-screen">
            {children}
          </main>
          <InteractiveFooter />
          <ScrollToTop />
          <Toaster position="top-center" richColors />
        </Providers>
      </body>
    </html>
  );
}
