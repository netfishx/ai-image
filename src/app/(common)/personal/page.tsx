import { getBackgroundImageStyle } from "@/app/bg";
import head from "@/assets/head.png";
import { Button } from "@/components/ui/button";
import {
  Contact,
  IdCard,
  ReceiptText,
  Share2,
  ShoppingCart,
  UserCog,
} from "lucide-react";
import { Link } from "next-view-transitions";
import Image from "next/image";

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
            userName
          </div>
          <Button
            variant="outline"
            size="sm"
            asChild
            className="bg-transparent opacity-50"
          >
            <Link href="/login">登录账号</Link>
          </Button>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-lg">普通用户</span>
          <Button className="bg-amber-500 text-lg" size="lg">
            成为VIP
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-2 *:flex *:aspect-square *:flex-col *:items-center *:justify-center *:gap-2 *:rounded-lg *:bg-slate-800 *:p-4">
        <Link href="#">
          <Share2 />
          分享推广
        </Link>
        <Link href="/records">
          <ReceiptText />
          制作记录
        </Link>
        <Link href="#">
          <ShoppingCart />
          我的购买
        </Link>
        <Link href="#">
          <Contact />
          联系客服
        </Link>
        <Link href="#">
          <IdCard />
          身份凭证
        </Link>
        <Link href="/reg">
          <UserCog />
          注册账号
        </Link>
      </div>
      <div className="flex flex-col items-center justify-center pt-8 text-sm">
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
      </div>
    </div>
  );
}
