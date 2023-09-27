import Providers from "@/components/Provider";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";

import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AI Notes",
  // create a beauttiful description for the website
  description: `Elevate your Note Taking experience to a whole new level with the SmartNote AI Notebook. 
            This cutting-edge digital notebook is designed to streamline your Note Taking process and make it more efficient 
            and visually appealing than ever before.`,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <Providers>
        <html lang="en">
          <body className={inter.className}>{children}</body>
        </html>
      </Providers>
    </ClerkProvider>
  );
}
