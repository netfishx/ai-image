"use client";

import { useAtom, useSetAtom } from "jotai";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { downloadAlertAtom, shareDialogAtom } from "@/lib/store";

export function DownloadAlert() {
  const [open, setOpen] = useAtom(downloadAlertAtom);
  const setShareDialogOpen = useSetAtom(shareDialogAtom);
  return (
    <AlertDialog onOpenChange={setOpen} open={open}>
      <AlertDialogContent className="bg-foreground text-background">
        <AlertDialogHeader>
          <AlertDialogTitle>温馨提示</AlertDialogTitle>
          <AlertDialogDescription className="text-background text-base">
            您的下载次数不够，请分享获取
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex-row justify-between px-8">
          <AlertDialogAction
            className="w-24 rounded-full bg-red-600/80 text-white"
            onClick={() => {
              setOpen(false);
              setShareDialogOpen(true);
            }}
          >
            分享获取
          </AlertDialogAction>
          <AlertDialogCancel className="w-24 rounded-full bg-blue-600/80 text-white">
            取消
          </AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
