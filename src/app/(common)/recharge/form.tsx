"use client";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { recharge } from "@/lib/api";
import { rechargeAlertAtom, rechargeAlertUrlAtom } from "@/lib/store";
import { cn } from "@/lib/utils";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
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
  const setRechargeAlertUrl = useSetAtom(rechargeAlertUrlAtom);
  const setRechargeAlert = useSetAtom(rechargeAlertAtom);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    startTransition(async () => {
      const formData = new FormData(e.currentTarget);
      const amount = formData.get("amount") as string;
      const res = await recharge(Number(amount));
      if (res.code !== 0) {
        toast.error(res.msg ?? "充值失败");
      } else {
        setRechargeAlertUrl(res.data);
        setRechargeAlert(true);
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
                    : "bg-orange-200 text-slate-900 hover:border-gold",
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
      <RechargeAlert />
    </Form>
  );
}

function RechargeAlert() {
  const [rechargeAlert, setRechargeAlert] = useAtom(rechargeAlertAtom);
  const rechargeAlertUrl = useAtomValue(rechargeAlertUrlAtom);
  return (
    <AlertDialog open={rechargeAlert} onOpenChange={setRechargeAlert}>
      <AlertDialogContent className="bg-foreground text-background">
        <AlertDialogHeader>
          <AlertDialogTitle>确认支付</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex flex-row justify-center px-8">
          <Button
            onClick={() => {
              setRechargeAlert(false);
              window.open(rechargeAlertUrl, "_blank");
            }}
            variant="outline"
            className="bg-foreground hover:bg-accent-foreground hover:text-accent"
          >
            去支付
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
