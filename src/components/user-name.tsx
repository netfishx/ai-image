import { CircleDollarSign } from "lucide-react";
import { Coins } from "@/components/coins";
import { RefreshButton } from "@/components/refresh";
import { getSession } from "@/lib/session";

export async function UserName() {
  const session = await getSession();

  return (
    <div className="flex items-center gap-1 text-sm">
      <span>{session?.userName ?? ""}</span>
      <CircleDollarSign className="size-4 text-gold" />
      <span>
        <Coins />
      </span>
      <RefreshButton className="size-4 text-foreground" />
    </div>
  );
}
