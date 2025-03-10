"use client";

import { cn } from "@/lib/utils";
import { ImageIcon, X } from "lucide-react";
import Image from "next/image";
import { type ChangeEvent, useState } from "react";
import { toast } from "sonner";

interface UploadButtonProps {
  maxSize?: number; // 单位：MB
  onFileSelect?: (file: File) => void;
  name: string;
}

export function Upload({ maxSize = 5, onFileSelect, name }: UploadButtonProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleFileInput = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFiles(files);
    }
  };

  const handleFiles = (files: FileList) => {
    // Check file size
    const maxSizeBytes = maxSize * 1024 * 1024;
    if (files[0].size > maxSizeBytes) {
      toast.error(`文件大小不能超过${maxSize}MB`);
      return;
    }

    const file = files[0];

    // Create preview URL
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);

    // Call onFileSelect callback if provided
    if (onFileSelect) {
      onFileSelect(file);
    } else {
      // Handle file upload logic here for backward compatibility
      console.info("Uploading file:", file);
    }
  };

  const removeFile = () => {
    setPreviewUrl(null);
  };

  return (
    <div className="h-full w-full">
      <div
        className={cn(
          "relative h-full rounded-lg bg-white",
          previewUrl ? "block" : "hidden",
        )}
      >
        {previewUrl && (
          <Image
            src={previewUrl}
            alt="Uploaded image preview"
            width={256}
            height={160}
            className="rounded-lg object-cover"
          />
        )}
        <button
          type="button"
          onClick={removeFile}
          className="absolute top-1 right-1 rounded-full bg-red-500 p-1 text-white"
        >
          <X size={16} />
        </button>
      </div>
      <label
        className={cn(
          "h-full cursor-pointer flex-col items-center justify-center rounded-lg bg-primary transition-colors hover:bg-primary/80",
          previewUrl ? "hidden" : "flex",
        )}
      >
        <input
          type="file"
          className="hidden"
          accept="image/*"
          onChange={handleFileInput}
          name={name}
        />
        <div>
          <ImageIcon className="size-8" />
        </div>
        <div className="mt-2 text-sm">立即上传</div>
      </label>
    </div>
  );
}
