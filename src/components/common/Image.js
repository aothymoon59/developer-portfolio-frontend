import React from "react";
import useProgressiveImage from "@ohs/use-progressive-image";
import { resolveAssetUrl } from "../../utils/assetUrl";

export function Image({ src, loader, ...props }) {
  const resolvedSrc = resolveAssetUrl(src);
  const [loading] = useProgressiveImage({
    img: resolvedSrc,
    ssr: false,
  });

  return <img src={loading ? loader : resolvedSrc} {...props} />;
}
