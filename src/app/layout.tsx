import type { Metadata } from "next";
import "./globals.css";
import { CheckUser } from "@/app/check-user";
import { Toaster } from "@/components/ui/sonner";
import { Provider as JotaiProvider } from "jotai";
import { type ReactNode, Suspense } from "react";
import { unstable_ViewTransition as ViewTransition } from "react";
import { PWAInstallDetector } from "./pwa";

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
    <html lang="en" className="dark">
      <body className="mx-auto flex h-screen flex-col overflow-hidden">
        <JotaiProvider>
          <ViewTransition>
            <Suspense>{children}</Suspense>
          </ViewTransition>
          <Toaster
            position="top-center"
            richColors
            expand
            visibleToasts={2}
            toastOptions={{ duration: 4000 }}
          />
          <Suspense>
            <CheckUser />
          </Suspense>
        </JotaiProvider>
        <PWAInstallDetector />
      </body>
    </html>
  );
}
