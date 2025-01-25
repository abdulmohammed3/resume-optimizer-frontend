import type { Metadata } from "next";
import { Comic_Neue } from "next/font/google";
import "./globals.css";
import NavBar from "../components/NavBar";

const comicNeue = Comic_Neue({
  weight: '700',
  subsets: ["latin"],
  variable: "--font-comic-neue",
});

export const metadata: Metadata = {
  title: "Resume Optimizer",
  description: "Make your resume stand out with smart optimization",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${comicNeue.variable} font-sans antialiased`}
      >
        <NavBar />
        {children}
      </body>
    </html>
  );
}
