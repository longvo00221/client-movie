/* eslint-disable jsx-a11y/iframe-has-title */
import React from "react";

function IframeTvMedia({id, season, episode}) {

  return (
    <iframe
      src={`https://www.2embed.cc/embedtv/${id}&s=${season}&e=${episode}`}
      width="100%"
      height="100%"
      frameBorder="0"
      scrolling="no"
      allowFullScreen
    ></iframe>
  );
}
export default IframeTvMedia;
