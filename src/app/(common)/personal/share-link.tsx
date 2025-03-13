"use client";

import { shareDialogAtom } from "@/lib/store";
import { useSetAtom } from "jotai";
import { Share2 } from "lucide-react";
import Link from "next/link";

export function ShareLink() {
  const setOpen = useSetAtom(shareDialogAtom);
  return (
    <Link
      href="#"
      onClick={(e) => {
        e.preventDefault();
        console.info("click");
        setOpen(true);
      }}
    >
      <Share2 />
      分享推广
    </Link>
  );
}
