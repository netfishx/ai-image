"use client";

import { ImageIcon, X } from "lucide-react";
import Image from "next/image";
import { type ChangeEvent, useState } from "react";
import { toast } from "sonner";

export default function UploadButton() {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleFileInput = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFiles(files);
    }
  };

  const handleFiles = (files: FileList) => {
    // Check file size (5MB = 5 * 1024 * 1024 bytes)
    const maxSize = 5 * 1024 * 1024;
    if (files[0].size > maxSize) {
      toast.error("文件大小不能超过5MB");
      return;
    }

    // Create preview URL
    const url = URL.createObjectURL(files[0]);
    setPreviewUrl(url);

    // Handle file upload logic here
    console.info("Uploading file:", files[0]);
  };

  const removeImage = () => {
    setPreviewUrl(null);
  };

  return (
    <div className="flex flex-col items-center">
      {previewUrl ? (
        <div className="relative mb-4 bg-white">
          <Image
            src={previewUrl || "/placeholder.svg"}
            alt="Uploaded image preview"
            width={256}
            height={160}
            className="h-40 w-64 rounded-lg object-cover"
          />
          <button
            type="button"
            onClick={removeImage}
            className="absolute top-1 right-1 rounded-full bg-red-500 p-1 text-white"
          >
            <X size={16} />
          </button>
        </div>
      ) : (
        <label
          className={
            "relative flex h-40 w-64 cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed bg-gray-100 transition-colors hover:bg-gray-200"
          }
        >
          <input
            type="file"
            className="hidden"
            accept="image/*"
            onChange={handleFileInput}
          />
          <ImageIcon className="mb-2 h-12 w-12 text-blue-500" />
          <div className="text-gray-600 text-sm">上传图片</div>
          <div className="mt-1 text-gray-500 text-xs">图片大小不要超过5MB</div>
        </label>
      )}
    </div>
  );
}
