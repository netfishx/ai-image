"use client";

import { checkUser } from "@/lib/api";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
export function CheckUser() {
  const searchParams = useSearchParams();
  const inviteCode = searchParams.get("inviteCode");
  const revenueBusinessId = searchParams.get("revenueBusinessId");
  useEffect(() => {
    checkUser(inviteCode, revenueBusinessId);
  }, [inviteCode, revenueBusinessId]);
  return null;
}
