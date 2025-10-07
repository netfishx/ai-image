import type { Metadata } from "next";
import "./globals.css";
import { Provider as JotaiProvider } from "jotai";
import {
  type ReactNode,
  Suspense,
  unstable_ViewTransition as ViewTransition,
} from "react";
import { CheckUser } from "@/app/check-user";
import { Toaster } from "@/components/ui/sonner";
import { PWAInstallDetector } from "./pwa";

export const metadata: Metadata = {
  description: "AI Web",
  title: "AI Web",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html className="dark" lang="en">
      <body className="mx-auto flex h-screen flex-col overflow-hidden">
        <JotaiProvider>
          <ViewTransition>
            <Suspense>{children}</Suspense>
          </ViewTransition>
          <Toaster
            expand
            position="top-center"
            richColors
            toastOptions={{ duration: 4000 }}
            visibleToasts={2}
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
