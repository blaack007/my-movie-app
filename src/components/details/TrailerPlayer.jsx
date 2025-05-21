import React from 'react';

const TrailerPlayer = ({ videoId }) => {
  if (!videoId) {
    return <p>No trailer available.</p>;
  }

  const embedUrl = `https://www.youtube.com/embed/${videoId}`;

  return (
    <div className="trailer-player-container">
      <h4 className="mb-3">Trailer</h4>
      <div className="iframe-container">
        <iframe
          src={embedUrl}
          style={{ border: 'none' }}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title="Trailer video player"
        ></iframe>
      </div>
    </div>
  );
};

export default TrailerPlayer; 