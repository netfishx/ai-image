import Image from "next/image";
import { Suspense } from "react";
import { getBackgroundImageStyle } from "@/app/bg";
import head from "@/assets/head.png";
import { Coins } from "@/components/coins";
import { getSession } from "@/lib/session";
import { RechargeForm } from "./form";

export default function Recharge() {
  return (
    <div
      className="flex h-[calc(100dvh-3rem)] flex-col gap-4 bg-cover px-4 pt-8"
      style={getBackgroundImageStyle("main")}
    >
      <div className="flex flex-col gap-4 rounded-lg bg-background/80 bg-cover p-4">
        <div className="flex items-center gap-2">
          <Image
            alt="avatar"
            className="rounded-full"
            height={40}
            src={head}
            width={40}
          />
          <Suspense>
            <UserInfo />
          </Suspense>
        </div>
      </div>
      <RechargeForm />
    </div>
  );
}

async function UserInfo() {
  const session = await getSession();
  return (
    <div className="flex flex-1 items-center justify-between">
      <span>{session?.userName ?? ""}</span>
      <div className="flex items-center gap-1">
        金币：
        <span>
          <Coins />
        </span>
      </div>
    </div>
  );
}
