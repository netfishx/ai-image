"use client";

import { cn } from "@/lib/utils";
import { FileVideoIcon, ImageIcon, X } from "lucide-react";
import Image from "next/image";
import { type ChangeEvent, useState } from "react";
import { toast } from "sonner";

export type FileType = "image" | "video" | "both";
export type UploadFileType = "image" | "video" | null;

interface UploadButtonProps {
  type?: FileType;
  maxSize?: number; // 单位：MB
  onFileSelect?: (file: File) => void;
  name: string;
}

export default function Upload({
  type = "both",
  maxSize = 5,
  onFileSelect,
  name,
}: UploadButtonProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [fileType, setFileType] = useState<UploadFileType>(null);

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

    // Check file type
    const file = files[0];
    const isImage = file.type.startsWith("image/");
    const isVideo = file.type.startsWith("video/");

    if (
      (type === "image" && !isImage) ||
      (type === "video" && !isVideo) ||
      (type === "both" && !isImage && !isVideo)
    ) {
      const supportedTypes =
        type === "both" ? "图片或视频" : type === "image" ? "图片" : "视频";
      toast.error(`只支持${supportedTypes}文件`);
      return;
    }

    // Create preview URL
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    setFileType(isImage ? "image" : "video");

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
    setFileType(null);
  };

  // 确定接受的文件类型
  const getAcceptTypes = () => {
    switch (type) {
      case "image":
        return "image/*";
      case "video":
        return "video/*";
      case "both":
        return "image/*,video/*";
      default:
        return "image/*,video/*";
    }
  };

  // 获取上传区域的文字提示
  const getUploadText = () => {
    switch (type) {
      case "image":
        return "上传图片";
      case "video":
        return "上传视频";
      case "both":
        return "上传图片或视频";
      default:
        return "上传文件";
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className={cn("relative bg-white", previewUrl ? "block" : "hidden")}>
        {fileType === "image" ? (
          <Image
            // biome-ignore lint/style/noNonNullAssertion: <explanation>
            src={previewUrl!}
            alt="Uploaded image preview"
            width={256}
            height={160}
            className="h-40 w-64 rounded-lg object-cover"
          />
        ) : (
          <video
            // biome-ignore lint/style/noNonNullAssertion: <explanation>
            src={previewUrl!}
            controls
            className="h-40 w-64 rounded-lg object-cover"
          >
            <track kind="captions" />
          </video>
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
          "relative h-40 w-64 cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed bg-gray-100 transition-colors hover:bg-gray-200",
          previewUrl ? "hidden" : "flex",
        )}
      >
        <input
          type="file"
          className="hidden"
          accept={getAcceptTypes()}
          onChange={handleFileInput}
          name={name}
        />
        <div className="flex space-x-2">
          {(type === "image" || type === "both") && (
            <ImageIcon className="h-10 w-10 text-blue-500" />
          )}
          {(type === "video" || type === "both") && (
            <FileVideoIcon className="h-10 w-10 text-blue-500" />
          )}
        </div>
        <div className="mt-2 text-gray-600 text-sm">{getUploadText()}</div>
        <div className="mt-1 text-gray-500 text-xs">
          文件大小不要超过{maxSize}MB
        </div>
      </label>
    </div>
  );
}
