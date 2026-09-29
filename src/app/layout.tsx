import type { Metadata } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });
const display = Space_Grotesk({ variable: "--font-display", subsets: ["latin"] });
const mono = JetBrains_Mono({ variable: "--font-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Aastha Shrivastava — Frontend Developer",
  description:
    "Portfolio of Aastha Shrivastava, a Frontend Developer building web and cross-platform mobile apps with React.js, Next.js and React Native.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${inter.variable} ${display.variable} ${mono.variable} antialiased`}>
      <body className="min-h-screen overflow-x-hidden font-sans">{children}</body>
    </html>
  );
}
