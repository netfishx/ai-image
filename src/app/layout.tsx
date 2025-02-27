"use cache";

import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
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
        <body className="flex h-screen flex-col overflow-hidden">
          <Suspense>{children}</Suspense>
          <Toaster
            position="top-center"
            richColors
            expand
            visibleToasts={2}
            toastOptions={{ duration: 2000 }}
          />
        </body>
      </html>
    </ViewTransitions>
  );
}
