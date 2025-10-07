"use client";

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { checkUser } from "@/lib/api";
export function CheckUser() {
  const searchParams = useSearchParams();
  const inviteCode = searchParams.get("inviteCode");
  const revenueBusinessId = searchParams.get("revenueBusinessId");
  useEffect(() => {
    checkUser(inviteCode, revenueBusinessId);
  }, [inviteCode, revenueBusinessId]);
  return null;
}
