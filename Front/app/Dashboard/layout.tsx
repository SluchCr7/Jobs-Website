import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "../globals.css";
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
        {children}
      </body>
    </html>
  );
}
