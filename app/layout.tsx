import type { Metadata } from "next";
import "./globals.css";
import "../styles/prism.css"
import { ClerkProvider } from "@clerk/nextjs";
import { ReactNode } from "react";
// eslint-disable-next-line camelcase
import { Space_Grotesk, Inter } from "next/font/google";
import ThemeProvider from "@/context/ThemeProvider";

const inter = Inter({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-inter",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-spaceGrotesk",
});

export const metadata: Metadata = {
  title: "DevFlow",
  description:
    "A community driven platform for asking and answering programming questions. Get help, share knowledge and collaborate with developers around the world. Explore topics in web development, mobile app development, cybersecurity, algorithms, data-structures and more",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <ClerkProvider appearance={{
      elements: {
        formButtonPrimary: "primary-gradient",
        footerActionLink: "primary-text-gradient:hover:text-primary-500"
      }
    }}>
      <html lang="en">
        <body
          className={`${inter.variable} ${spaceGrotesk.variable} antialiased`}
        >
          <ThemeProvider>
          {children}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
