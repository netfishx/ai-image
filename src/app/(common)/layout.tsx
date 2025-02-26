import type { ReactNode } from "react";
import { CommonHeader } from "./common-header";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <CommonHeader />
      {children}
    </>
  );
}
