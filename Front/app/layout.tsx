import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Header from "./Components/Header";
import InteractiveFooter from "./Components/Footer";

export const metadata: Metadata = {
  title: "YourJOp",
  description: "YourJOp is a job search platform that helps you find your dream job.",
};

// 🟢 استيراد الخط الإنجليزي
const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400"],
  style: ["normal", "italic"],
  variable: "--font-english",
});


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`antialiased ${jetBrainsMono.className} bg-white text-gray-900 w-full`}
      >
        <Header/>
        {children}
        <InteractiveFooter/>
      </body>
    </html>
  );
}
