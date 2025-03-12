"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import Form from "next/form";
import { type FormEvent, useState, useTransition } from "react";

interface CoinPackage {
  id: string;
  coins: number;
  price: number;
}

export function RechargeForm() {
  const [selectedPackage, setSelectedPackage] = useState("35");

  const coinPackages: CoinPackage[] = [
    { id: "35", coins: 35, price: 30 },
    { id: "69", coins: 69, price: 50 },
    { id: "149", coins: 149, price: 100 },
    { id: "319", coins: 319, price: 200 },
    { id: "499", coins: 499, price: 300 },
    { id: "799", coins: 799, price: 500 },
  ];

  const [isLoading, startTransition] = useTransition();

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    startTransition(async () => {
      const formData = new FormData(e.currentTarget);
      const packageId = formData.get("packageId") as string;
      console.log(packageId);
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
          name="packageId"
        >
          {coinPackages.map((pkg) => (
            <div key={pkg.id} className="relative">
              <RadioGroupItem
                value={pkg.id}
                id={`coin-${pkg.id}`}
                className="sr-only"
              />
              <Label
                htmlFor={`coin-${pkg.id}`}
                className={cn(
                  "flex h-28 cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-transparent",
                  "transition-all duration-200",
                  selectedPackage === pkg.id
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
