import React from "react";
import LineIcon from "react-lineicons";
import useSiteSettings from "../hooks/useSiteSettings";

function Socialicons(props) {
  const { siteSettings } = useSiteSettings();

  const socialLinks = {
    facebook: siteSettings.facebookUrl,
    twitter: siteSettings.twitterUrl,
    pinterest: null, // not in API
    behance: null, // not in API
    linkedin: siteSettings.linkedinUrl,
    dribbble: null, // not in API
    github: siteSettings.githubUrl,
  };

  return (
    <ul
      className={
        props.bordered
          ? "mi-socialicons mi-socialicons-bordered"
          : "mi-socialicons"
      }
    >
      {!socialLinks.facebook ? null : (
        <li>
          <a
            rel="noopener noreferrer"
            target="_blank"
            href={socialLinks.facebook}
          >
            <LineIcon name="facebook" />
          </a>
        </li>
      )}
      {!socialLinks.twitter ? null : (
        <li>
          <a
            rel="noopener noreferrer"
            target="_blank"
            href={socialLinks.twitter}
          >
            <LineIcon name="twitter" />
          </a>
        </li>
      )}
      {!socialLinks.pinterest ? null : (
        <li>
          <a
            rel="noopener noreferrer"
            target="_blank"
            href={socialLinks.pinterest}
          >
            <LineIcon name="pinterest" />
          </a>
        </li>
      )}
      {!socialLinks.behance ? null : (
        <li>
          <a
            rel="noopener noreferrer"
            target="_blank"
            href={socialLinks.behance}
          >
            <LineIcon name="behance" />
          </a>
        </li>
      )}
      {!socialLinks.linkedin ? null : (
        <li>
          <a
            rel="noopener noreferrer"
            target="_blank"
            href={socialLinks.linkedin}
          >
            <LineIcon name="linkedin" />
          </a>
        </li>
      )}
      {!socialLinks.dribbble ? null : (
        <li>
          <a
            rel="noopener noreferrer"
            target="_blank"
            href={socialLinks.dribbble}
          >
            <LineIcon name="dribbble" />
          </a>
        </li>
      )}
      {!socialLinks.github ? null : (
        <li>
          <a
            rel="noopener noreferrer"
            target="_blank"
            href={socialLinks.github}
          >
            <LineIcon name="github" />
          </a>
        </li>
      )}
    </ul>
  );
}

export default Socialicons;
