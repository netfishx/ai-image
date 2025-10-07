import { Suspense } from "react";
import { getUserInfo } from "@/lib/api";
import { GifForm } from "./form";

export default function GifPage() {
  return (
    <div className="flex flex-1 flex-col gap-4 px-2 py-4">
      <Suspense>
        <FormWrapper />
      </Suspense>
      <div className="px-4 text-xs">
        <div className="font-medium">注意事项:</div>
        <ol className="list-decimal pl-4">
          <li className="leading-relaxed">
            素材仅供AI使用，绝无外泄风险，请放心使用
          </li>
          <li className="leading-relaxed">
            选择合适的高清正面照，胸部尺寸不要被手臂，头发遮挡，尺寸选择正面站立图，不要使用多人图，最好是选择能看到手臂和起码半个身体的照片，环境光线不要太暗
          </li>
          <li className="leading-relaxed">
            禁止上传未成年人或政府官员照片，如发现封号处理
          </li>
          <li className="leading-relaxed">
            未按要求上传照片导致的失败或者效果不好，将不会退回金币
          </li>
        </ol>
      </div>
    </div>
  );
}

async function FormWrapper() {
  const res = await getUserInfo();
  const coins = res.data?.coins ?? 0;
  return <GifForm coins={coins} />;
}
