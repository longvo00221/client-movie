/* eslint-disable jsx-a11y/iframe-has-title */
import React from 'react'

export default function IframeMedia(id) {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '70vh' }}>
      <iframe
        src={`https://www.2embed.cc/embed/${id.id}`}
        width="100%"
        height="100%"
        frameBorder="0"
        scrolling="no"
        allowFullScreen
      ></iframe>
    </div>
  )
}