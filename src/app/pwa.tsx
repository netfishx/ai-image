"use client";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: "accepted" | "dismissed";
    platform: string;
  }>;
  prompt(): Promise<void>;
}

const iosRegex = /iphone|ipad|ipod/;

export function PWAInstallDetector() {
  const [installPrompt, setInstallPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    if (!window) {
      return;
    }
    // 检测是否已安装为PWA
    function checkIfInstalled() {
      // 检查是否处于standalone模式
      const isStandalone = window.matchMedia(
        "(display-mode: standalone)",
      ).matches;
      // iOS Safari
      const isIOSInstalled =
        "standalone" in window.navigator &&
        window.navigator.standalone === true;
      // localStorage检查
      const isPreviouslyInstalled =
        localStorage.getItem("pwaInstalled") === "true";

      return isStandalone || isIOSInstalled || isPreviouslyInstalled;
    }
    const checkIfIOS = () => {
      const userAgent = window.navigator.userAgent.toLowerCase();

      return iosRegex.test(userAgent);
    };

    // 设置初始状态
    const installed = checkIfInstalled();
    setIsInstalled(installed);
    setIsIOS(checkIfIOS());

    if (!installed) {
      const timer = setTimeout(() => {
        setShowAlert(true);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, []);

  // 监听beforeinstallprompt事件
  useEffect(() => {
    if (!window) {
      return;
    }
    const handleBeforeInstallPrompt = (e: BeforeInstallPromptEvent) => {
      e.preventDefault();
      setInstallPrompt(e);
    };

    // 监听appinstalled事件
    const handleAppInstalled = () => {
      setIsInstalled(true);
      setShowAlert(false);
      localStorage.setItem("pwaInstalled", "true");
      toast.success("应用已成功安装到您的设备！");
    };

    // 添加事件监听器
    window.addEventListener(
      "beforeinstallprompt",
      handleBeforeInstallPrompt as EventListener,
    );
    window.addEventListener("appinstalled", handleAppInstalled);

    // 清理函数
    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt as EventListener,
      );
      window.removeEventListener("appinstalled", handleAppInstalled);
    };
  }, []);

  // 处理安装
  const handleInstall = async () => {
    if (installPrompt) {
      // 显示安装提示
      installPrompt.prompt();

      // 等待用户响应
      const { outcome } = await installPrompt.userChoice;
      console.info(`用户安装选择: ${outcome}`);

      // 清除保存的提示
      setInstallPrompt(null);

      // 关闭alert
      setShowAlert(false);
    }
  };

  const closeAlert = () => {
    setShowAlert(false);
    sessionStorage.setItem("pwaAlertDismissed", "true");
  };
  return (
    <AlertDialog
      open={
        showAlert &&
        !isInstalled &&
        !sessionStorage.getItem("pwaAlertDismissed")
      }
    >
      <AlertDialogContent className="bg-foreground text-background">
        <AlertDialogDescription />
        <AlertDialogHeader>
          <AlertDialogTitle>安装应用</AlertDialogTitle>
        </AlertDialogHeader>

        {isIOS ? (
          <>
            <p>在iOS设备上安装此应用：</p>
            <ul>
              <li>1.点击浏览器底部的"分享"按钮</li>
              <li>2.在菜单中选择"添加到主屏幕"</li>
              <li>3.点击"添加"确认</li>
            </ul>
            <AlertDialogFooter className="flex flex-row justify-center px-8">
              <Button
                className="bg-foreground hover:bg-accent-foreground hover:text-accent"
                onClick={closeAlert}
                variant="outline"
              >
                知道了
              </Button>
            </AlertDialogFooter>
          </>
        ) : installPrompt ? (
          <>
            <p>将此应用安装到您的设备，获得更好的体验！</p>
            <AlertDialogFooter className="flex flex-row justify-between px-8">
              <Button
                className="bg-foreground hover:bg-accent-foreground hover:text-accent"
                onClick={closeAlert}
                variant="outline"
              >
                稍后再说
              </Button>
              <Button onClick={handleInstall}>立即安装</Button>
            </AlertDialogFooter>
          </>
        ) : (
          <>
            <p>您的浏览器可能不支持自动安装。</p>
            <AlertDialogFooter className="flex flex-row justify-center px-8">
              <Button
                className="bg-foreground hover:bg-accent-foreground hover:text-accent"
                onClick={closeAlert}
                variant="outline"
              >
                知道了
              </Button>
            </AlertDialogFooter>
          </>
        )}
      </AlertDialogContent>
    </AlertDialog>
  );
}
