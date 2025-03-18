import { getUserInfo } from "@/lib/api";
import { Minus } from "lucide-react";
import { Suspense } from "react";
import { UploadForm } from "./form";
import { GoBack } from "./goback";

export default async function Step({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const { type } = await searchParams;
  let title = "";
  switch (type) {
    case "1":
      title = "图片";
      break;
    case "2":
      title = "GIF";
      break;
    case "3":
      title = "视频";
      break;
    default:
      title = "未知";
  }
  const res = await getUserInfo();
  const coins = res.data?.coins ?? 0;
  return (
    <div className="relative flex flex-col gap-2">
      <div className="flex items-center justify-between text-lg">
        <div className="flex items-center gap-2">
          <Minus className="rotate-90" />
          {title}
        </div>
        <GoBack />
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        <UploadForm coins={coins} type={type ?? "1"} />
      </Suspense>
      <ul className="px-4 text-xs">
        <li>1.禁止上传未成年人或政府官员照片，如发现封号处理</li>
        <li>2.图片只能出现一张人脸，多人照片无法换脸</li>
        <li>3.选择合适的高清正脸照片，脸上无遮挡，不要带眼镜，刘海不要太长</li>
        <li>4.全身照可以使用相册的裁剪功能裁剪至示例图大小</li>
        <li>5.未按要求上传照片导致的失败或者效果不好，将不会退回金币</li>
      </ul>
    </div>
  );
}
