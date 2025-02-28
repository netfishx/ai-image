"use client";

import { checkUser } from "@/lib/api";
import { useEffect } from "react";

export function CheckUser() {
  useEffect(() => {
    checkUser();
  }, []);
  return null;
}
