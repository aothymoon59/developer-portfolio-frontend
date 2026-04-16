import React, { useState, useEffect } from "react";
import LineIcon from "react-lineicons";
import api from "../utils/api";

function Socialicons(props) {
  const [socialLinks, setSocialLinks] = useState({});

  useEffect(() => {
    api.get("/portfolio/site-settings").then((response) => {
      const data = response.data.data;
      setSocialLinks({
        facebook: data.facebookUrl,
        twitter: data.twitterUrl,
        pinterest: null, // not in API
        behance: null, // not in API
        linkedin: data.linkedinUrl,
        dribbble: null, // not in API
        github: data.githubUrl,
      });
    });
  }, []);

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
