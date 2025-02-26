"use cache";

import type { Metadata } from "next";
import "./globals.css";
import { ViewTransitions } from "next-view-transitions";
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
    <ViewTransitions>
      <html lang="en" className="dark">
        <body className="flex h-screen flex-col">
          <Suspense>{children}</Suspense>
        </body>
      </html>
    </ViewTransitions>
  );
}
