"use client";

import { useSetAtom } from "jotai";
import { Share2 } from "lucide-react";
import Link from "next/link";
import { shareDialogAtom } from "@/lib/store";

export function ShareLink() {
  const setOpen = useSetAtom(shareDialogAtom);
  return (
    <Link
      href="#"
      onClick={(e) => {
        e.preventDefault();
        setOpen(true);
      }}
    >
      <Share2 />
      分享推广
    </Link>
  );
}
