import React, { useEffect, useMemo } from "react";
import { Helmet } from "react-helmet";
import useSiteSettings from "../hooks/useSiteSettings";
import { resolveAssetUrl } from "../utils/assetUrl";

function SiteHelmet({ pageTitle, description }) {
  const { siteSettings } = useSiteSettings();
  const siteTitle = siteSettings.siteTitle || "Developer Portfolio";
  const faviconUrl = useMemo(() => {
    const resolvedUrl = resolveAssetUrl(siteSettings.faviconUrl);
    if (!resolvedUrl) return "";

    const separator = resolvedUrl.includes("?") ? "&" : "?";
    return `${resolvedUrl}${separator}v=${encodeURIComponent(siteSettings.faviconUrl || resolvedUrl)}`;
  }, [siteSettings.faviconUrl]);
  const title = pageTitle ? `${siteTitle} | ${pageTitle}` : siteTitle;

  useEffect(() => {
    if (!faviconUrl) return;

    const ensureFaviconLink = (rel) => {
      let link = document.querySelector(`link[rel='${rel}']`);

      if (!link) {
        link = document.createElement("link");
        link.setAttribute("rel", rel);
        document.head.appendChild(link);
      }

      link.setAttribute("href", faviconUrl);
      return link;
    };

    ensureFaviconLink("icon");
    ensureFaviconLink("shortcut icon");
  }, [faviconUrl]);

  return (
    <Helmet>
      <title>{title}</title>
      {description ? <meta name="description" content={description} /> : null}
      {faviconUrl ? <link rel="icon" href={faviconUrl} /> : null}
      {faviconUrl ? <link rel="shortcut icon" href={faviconUrl} /> : null}
    </Helmet>
  );
}

export default SiteHelmet;
