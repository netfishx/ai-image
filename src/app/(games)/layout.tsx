import { Header } from "@/app/(games)/header";
import type { ReactNode } from "react";

export default async function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <>
      <Header />
      {children}
    </>
  );
}
