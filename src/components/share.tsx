"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { shareDialogAtom } from "@/lib/store";
import { useAtom } from "jotai";
import { QRCodeSVG } from "qrcode.react";
import { useRef } from "react";
import { useCopyToClipboard } from "react-use";
import { toast } from "sonner";

export function ShareDialog({ username }: { username: string }) {
  const [open, setOpen] = useAtom(shareDialogAtom);
  const [, copyToClipboard] = useCopyToClipboard();
  const qrCodeRef = useRef<HTMLDivElement>(null);

  // 下载SVG为图片
  const downloadQRCodeAsImage = () => {
    if (!qrCodeRef.current) {
      return;
    }

    const svgElement = qrCodeRef.current.querySelector("svg");
    if (!svgElement) {
      toast.error("找不到SVG元素");
      return;
    }

    try {
      // 创建一个临时的canvas元素
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        toast.error("浏览器不支持Canvas");
        return;
      }

      // 获取SVG尺寸并设置Canvas大小
      const svgWidth = svgElement.clientWidth || 200;
      const svgHeight = svgElement.clientHeight || 200;

      // 设置更大的尺寸以获得更清晰的图片
      const scale = 2;
      canvas.width = svgWidth * scale;
      canvas.height = svgHeight * scale;

      // 将SVG内容转为字符串
      const svgData = new XMLSerializer().serializeToString(svgElement);
      const svgBlob = new Blob([svgData], {
        type: "image/svg+xml;charset=utf-8",
      });
      const svgUrl = URL.createObjectURL(svgBlob);

      // 创建图片对象
      const img = new Image();
      img.onload = () => {
        // 设置背景为白色
        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // 在Canvas上绘制SVG图像
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        // 将Canvas转为图片URL
        const imgUrl = canvas.toDataURL("image/png");

        // 创建下载链接
        const downloadLink = document.createElement("a");
        downloadLink.href = imgUrl;
        downloadLink.download = `邀请码-${username}.png`;
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);

        // 释放资源
        URL.revokeObjectURL(svgUrl);
        toast.success("图片已保存");
      };

      img.onerror = () => {
        toast.error("图片生成失败");
        URL.revokeObjectURL(svgUrl);
      };

      img.src = svgUrl;
    } catch (error) {
      console.error("下载图片出错:", error);
      toast.error("下载图片出错");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="bg-foreground text-background">
        <DialogHeader>
          <DialogTitle>分享获得下载次数</DialogTitle>
          <DialogDescription>用户名：{username}</DialogDescription>
          <div className="flex items-center justify-center p-4" ref={qrCodeRef}>
            <QRCodeSVG
              value={`https://tuoyi11.cc?inviteCode=${username}`}
              className="size-50"
            />
          </div>
          <div className="text-xs *:text-start">
            <p>亲，您可以通过分享获得更多的下载次数！</p>
            <p>获得分享内容后，请发送朋友圈或好友，即可获得下载次数！</p>
            <p>您的专属链接：https://tuoyi11.cc?inviteCode={username}</p>
          </div>
          <div className="flex justify-between p-8">
            <Button
              className="w-24 rounded-full bg-red-600/80 text-white"
              onClick={downloadQRCodeAsImage}
            >
              保存图片
            </Button>
            <Button
              className="w-24 rounded-full bg-blue-600/80 text-white"
              onClick={() => {
                copyToClipboard(`https://tuoyi11.cc?inviteCode=${username}`);
                toast.success("复制成功");
              }}
            >
              复制链接
            </Button>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
