import { AlertCircle } from "lucide-react";
import { Suspense } from "react";
import { getBackgroundImageStyle } from "@/app/bg";
import { getRechargeRecords } from "@/lib/api";
import { Time } from "./time";

export default function OrdersPage() {
  return (
    <div
      className="flex h-[calc(100dvh-3rem)] flex-col gap-4 bg-cover p-4"
      style={getBackgroundImageStyle("main")}
    >
      <Suspense>
        <List />
      </Suspense>
    </div>
  );
}

async function List() {
  const res = await getRechargeRecords();

  return (
    <>
      {res.data?.map((item) => (
        <div
          className="flex items-center justify-between gap-2 rounded-xl bg-foreground p-4 text-background"
          key={item.businessId}
        >
          <div className="flex items-center gap-2">
            <AlertCircle className="size-8 text-green-500" />
            <div className="flex flex-col">
              <div>充值：{item.rechargeAmount}元</div>
              <div className="text-muted-foreground text-xs">
                <Time time={item.createdTime} />
              </div>
            </div>
          </div>
          <div>
            {item.rechargeStatus === 1
              ? "支付成功"
              : item.rechargeStatus === 0
                ? "支付失败"
                : "支付中"}
          </div>
        </div>
      ))}
    </>
  );
}
