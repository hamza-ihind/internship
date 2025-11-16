import { Gantari } from "next/font/google";
import "./globals.css";
import { ReactNode } from "react";

const gantari = Gantari({ subsets: ["latin"] });

export const metadata = {
  title: "Moroccan Internship Platform",
  description: "Find, filter, and apply for internships in Morocco",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={`${gantari.className} min-h-dvh bg-white text-primary`}>
        {children}
      </body>
    </html>
  );
}