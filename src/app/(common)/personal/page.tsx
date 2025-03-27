import { IdLink } from "@/app/(common)/personal/id-link";
import { ShareLink } from "@/app/(common)/personal/share-link";
import { getBackgroundImageStyle } from "@/app/bg";
import head from "@/assets/head.png";
import { Coins } from "@/components/coins";
import { RefreshButton } from "@/components/refresh";
import { Button } from "@/components/ui/button";
import { getSession } from "@/lib/session";
import { Contact, ReceiptText, ShoppingCart, UserCog } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";

export default function Personal() {
  return (
    <div
      className="flex flex-1 flex-col gap-4 bg-cover px-4 pt-8"
      style={getBackgroundImageStyle("main")}
    >
      <div
        className="flex flex-col gap-4 rounded-lg bg-background bg-cover p-4 text-background"
        style={getBackgroundImageStyle("vip")}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Image
              src={head}
              width={40}
              height={40}
              alt="avatar"
              className="rounded-full"
            />
            <Suspense>
              <UserName />
            </Suspense>
          </div>
          <Button
            variant="outline"
            size="sm"
            asChild
            className="rounded-full opacity-50 dark:bg-transparent"
          >
            <Link href="/login">登录账号</Link>
          </Button>
        </div>
        <div className="flex items-center">
          <span className="text-lg">普通用户</span>
        </div>
      </div>
      <div
        className="flex flex-col gap-1 rounded-lg bg-background bg-cover p-4"
        style={getBackgroundImageStyle("wallet")}
      >
        <div className="flex items-center justify-between">
          <div>我的钱包</div>
          <div className="flex gap-2">
            <Button size="sm" className="rounded-full bg-amber-400" asChild>
              <Link href="/recharge">立即充值</Link>
            </Button>
            <Button size="sm" className="rounded-full bg-primary" asChild>
              <Link href="/orders">交易记录</Link>
            </Button>
          </div>
        </div>
        <div className="flex items-center gap-1 text-sm">
          <span className="text-amber-400 text-xl">
            <Suspense>
              <Coins />
            </Suspense>
          </span>
          金币
          <RefreshButton className="text-background" />
          <span className="text-xs opacity-60">充值如有延迟，请多刷新几次</span>
        </div>
        <div className="grid grid-cols-2 text-xs">
          <span>
            <span className="opacity-60">剩余图片换脸次数：</span>0
          </span>
          <span>
            <span className="opacity-60">剩余视频换脸次数：</span>0
          </span>
          <span>
            <span className="opacity-60">剩余一键脱衣次数：</span>0
          </span>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-2 *:flex *:aspect-square *:flex-col *:items-center *:justify-center *:gap-2 *:rounded-lg *:bg-slate-800 *:p-4">
        <ShareLink />
        <Link href="/records">
          <ReceiptText />
          制作记录
        </Link>
        <Link href="/orders">
          <ShoppingCart />
          我的购买
        </Link>
        <Link href="#">
          <Contact />
          联系客服
        </Link>
        <IdLink />
        <Link href="/reg">
          <UserCog />
          注册账号
        </Link>
      </div>
      {/* <div className="flex flex-col items-center justify-center pt-8 text-sm">
        <div className="break-all">
          本站永久域名：
          <Button variant="link" className="p-0 text-cyan-500 underline">
            https://www.yun-yun.com
          </Button>
        </div>
        <div className="break-all">
          发送邮件至
          <Button variant="link" className="p-0 text-cyan-500 underline">
            12312312@gmail.com
          </Button>
          即可获取永久域名
        </div>
        <div className="break-all">
          官方永久telegram订阅频道：
          <Button variant="link" className="p-0 text-cyan-500 underline">
            https://t.me/yun_yun
          </Button>
        </div>
      </div> */}
    </div>
  );
}
async function UserName() {
  const session = await getSession();

  return <span>{session?.userName ?? ""}</span>;
}
