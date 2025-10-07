"use client";
import { useSetAtom } from "jotai";
import { IdCard } from "lucide-react";
import Link from "next/link";
import { idDialogAtom } from "@/lib/store";

export function IdLink() {
  const setOpen = useSetAtom(idDialogAtom);
  return (
    <Link
      href="#"
      onClick={(e) => {
        e.preventDefault();
        setOpen(true);
      }}
    >
      <IdCard />
      身份凭证
    </Link>
  );
}
