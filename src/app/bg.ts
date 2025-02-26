import mainBg from "@/assets/main.jpg";
import navBg from "@/assets/nav.jpg";
import vipBg from "@/assets/vip.jpg";
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

export function getBackgroundImageStyle(type: "nav" | "main" | "vip") {
  let params = null;
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

    default:
      throw new Error("Invalid background image type");
  }

  const {
    props: { srcSet },
  } = params;
  const backgroundImage = getBackgroundImage(srcSet);
  return { backgroundImage };
}
