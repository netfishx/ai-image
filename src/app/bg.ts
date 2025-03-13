import mainBg from "@/assets/main.jpg";
import navBg from "@/assets/nav.jpg";
import vipBg from "@/assets/vip.jpg";
import walletBg from "@/assets/wallet_bg.jpg";
import { getImageProps } from "next/image";

function getBackgroundImage(srcSet = "") {
  const imageSet = srcSet
    .split(", ")
    .map((str) => {
      const [url, dpi] = str.split(" ");
      return `url("${url}") ${dpi}`;
    })
    .join(", ");
  return `image-set(${imageSet})`;
}

export function getBackgroundImageStyle(
  type: "nav" | "main" | "vip" | "wallet",
) {
  let params: {
    props: {
      srcSet?: string;
    };
  } | null = null;
  switch (type) {
    case "nav":
      params = getImageProps({
        alt: "",
        width: 1920,
        height: 602,
        src: navBg,
      });
      break;

    case "main":
      params = getImageProps({
        alt: "",
        width: 800,
        height: 1420,
        src: mainBg,
      });
      break;

    case "vip":
      params = getImageProps({
        alt: "",
        width: 1536,
        height: 400,
        src: vipBg,
      });
      break;

    case "wallet":
      params = getImageProps({
        alt: "",
        width: 914,
        height: 381,
        src: walletBg,
      });
      break;
    default:
      throw new Error("Invalid background image type");
  }

  const {
    props: { srcSet },
  } = params;
  const backgroundImage = getBackgroundImage(srcSet);
  return { backgroundImage };
}
