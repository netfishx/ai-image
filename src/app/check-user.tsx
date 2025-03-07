"use client";

import { checkUser } from "@/lib/api";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
export function CheckUser() {
  const searchParams = useSearchParams();
  const inviteCode = searchParams.get("inviteCode");
  useEffect(() => {
    checkUser(inviteCode);
  }, [inviteCode]);
  return null;
}
