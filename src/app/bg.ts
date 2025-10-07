import { getImageProps } from "next/image";
import mainBg from "@/assets/main.jpg";
import navBg from "@/assets/nav.jpg";
import vipBg from "@/assets/vip.jpg";
import walletBg from "@/assets/wallet_bg.jpg";

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
        height: 602,
        src: navBg,
        width: 1920,
      });
      break;

    case "main":
      params = getImageProps({
        alt: "",
        height: 1420,
        src: mainBg,
        width: 800,
      });
      break;

    case "vip":
      params = getImageProps({
        alt: "",
        height: 400,
        src: vipBg,
        width: 1536,
      });
      break;

    case "wallet":
      params = getImageProps({
        alt: "",
        height: 381,
        src: walletBg,
        width: 914,
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
