import { Button } from "@/components/ui/button";
import { getResource } from "@/lib/api";
import { rgbDataURL } from "@/lib/utils";
import { CloudUpload, Gem } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { ActionButton } from "./action";

export default function GifPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <List />
      <Button
        className="fixed right-4 bottom-4 rounded-full bg-green-500"
        asChild
      >
        <Link href="/image/custom">
          <CloudUpload />
          上传自定义素材
        </Link>
      </Button>
    </Suspense>
  );
}

async function List() {
  const resource = await getResource(1);

  return (
    <ul className="grid grid-cols-2 gap-2 p-2">
      {resource?.data?.map((item) => (
        <li key={item.businessId} className="flex flex-col">
          <div className="relative h-50 w-full">
            <Image
              src={item.materialUrl}
              alt={item.businessId}
              fill
              placeholder="blur"
              blurDataURL={rgbDataURL(200, 200, 200)}
              className="rounded-t-2xl object-cover"
              sizes="50vw"
            />
            <div className="absolute bottom-1 left-1 flex items-center gap-1 text-amber-400">
              <Gem />
              {item.materialCoins}
            </div>
          </div>
          <div className="flex items-center justify-between rounded-b-2xl bg-neutral-700/80 px-2 py-1">
            <span className="text-wrap break-all text-xs">
              {item.materialTitle}
            </span>
            <ActionButton resource={item} />
          </div>
        </li>
      ))}
    </ul>
  );
}
