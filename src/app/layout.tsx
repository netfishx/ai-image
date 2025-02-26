"use cache";

import type { Metadata } from "next";
import "./globals.css";
import { type ReactNode, Suspense } from "react";
export const metadata: Metadata = {
  title: "AI Web",
  description: "AI Web",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="flex h-screen flex-col">
        <Suspense>{children}</Suspense>
      </body>
    </html>
  );
}
