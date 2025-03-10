"use client";

import { Upload } from "@/app/(games)/step/upload";
import mb from "@/assets/mb.png";
import { Button } from "@/components/ui/button";
import { resourceAtom } from "@/lib/store";
import { useAtomValue } from "jotai";
import { Minus } from "lucide-react";
import Form from "next/form";
import Image from "next/image";

export function UploadForm({ coins }: { coins: number }) {
  const resource = useAtomValue(resourceAtom);
  return (
    <Form action="">
      <div className="p-4">
        <Image
          src={resource?.materialUrl ?? ""}
          alt="gif"
          width={2000}
          height={1000}
          className="rounded-lg"
        />
      </div>
      <div className="flex items-center justify-between px-1 text-lg">
        <div className="flex items-center gap-2">
          <Minus className="rotate-90" />
          上传脸部信息
        </div>
        <span className="text-xs">(请上传正脸照，五官清晰)</span>
      </div>
      <div className="p-4">
        <div className="flex rounded-2xl bg-gradient-to-r from-neutral-100 to-sky-200 py-4">
          <div className="w-3/5 p-4">
            <Image src={mb} alt="mb" width={424} height={292} />
          </div>
          <div className="flex-1 p-4">
            <Upload name="face" />
          </div>
        </div>
      </div>
      <div className="p-4">
        <div className="grid grid-cols-4 gap-2 rounded-full bg-primary px-4 py-2 text-sm *:flex *:flex-col *:items-center *:justify-center">
          <div>
            <span className="text-amber-400 text-xs">
              {resource?.materialCoins ?? 0}
            </span>
            <span>消耗金币</span>
          </div>
          <div>
            <span className="text-amber-400 text-xs">0</span>
            <span>剩余次数</span>
          </div>
          <div>
            <span className="text-amber-400 text-xs">{coins}.00</span>
            <span>账户余额</span>
          </div>
          <div>
            <Button className="rounded-full bg-amber-400 text-sm" size="sm">
              开始制作
            </Button>
          </div>
        </div>
      </div>
    </Form>
  );
}
