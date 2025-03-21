"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { recharge } from "@/lib/api";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import Form from "next/form";
import { type FormEvent, useState, useTransition } from "react";
import { toast } from "sonner";
interface CoinPackage {
  coins: number;
  price: number;
}

export function RechargeForm() {
  const [selectedPackage, setSelectedPackage] = useState("30");

  const coinPackages: CoinPackage[] = [
    { coins: 35, price: 30 },
    { coins: 69, price: 50 },
    { coins: 149, price: 100 },
    { coins: 319, price: 200 },
    { coins: 499, price: 300 },
    { coins: 799, price: 500 },
  ];

  const [isLoading, startTransition] = useTransition();

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    startTransition(async () => {
      const formData = new FormData(e.currentTarget);
      const amount = formData.get("amount") as string;
      const res = await recharge(Number(amount));
      if (res.code !== 0) {
        toast.error(res.msg ?? "充值失败");
      } else {
        window.open(res.data, "_blank");
      }
    });
  }

  return (
    <Form action="" className="flex flex-col gap-4" onSubmit={handleSubmit}>
      <div className="flex flex-col gap-4 rounded-lg bg-background/80 bg-cover p-2">
        <div className="text-center text-lg">金币套餐</div>
        <RadioGroup
          value={selectedPackage}
          onValueChange={setSelectedPackage}
          className="grid grid-cols-3 gap-2"
          name="amount"
        >
          {coinPackages.map((pkg) => (
            <div key={pkg.price} className="relative">
              <RadioGroupItem
                value={pkg.price.toString()}
                id={`coin-${pkg.price}`}
                className="sr-only"
              />
              <Label
                htmlFor={`coin-${pkg.price}`}
                className={cn(
                  "flex h-28 cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-transparent",
                  "transition-all duration-200",
                  selectedPackage === pkg.price.toString()
                    ? "bg-blue-500 text-white"
                    : "bg-orange-200 text-slate-900 hover:border-amber-400",
                )}
              >
                <span className="font-bold text-3xl">{pkg.coins}</span>
                <span className="text-sm">金币</span>
                <span className="text-sm">{pkg.price} 元</span>
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>
      <Button className="w-full" size="lg" type="submit" disabled={isLoading}>
        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        立即支付
      </Button>
    </Form>
  );
}
