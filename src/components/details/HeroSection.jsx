import React from 'react';

export default function HeroSection({ details, imageBaseUrl }) {
  const getReleaseYear = () => {
    const dateString = details.release_date || details.first_air_date;
    
    if (!dateString) return 'Unknown Year';
    
    const year = new Date(dateString).getFullYear();
    return isNaN(year) ? 'Unknown Year' : year;
  };

  const title = details.title || details.name || 'Untitled';

  return (
    <div 
      className="hero-section position-relative"
      style={{
        backgroundImage: `url(${imageBaseUrl}${details.backdrop_path})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '500px'
      }}
    >
      <div className="overlay position-absolute w-100 h-100" />
      <div className="container-fluid position-relative py-5">
        <div className="row align-items-center">
          <div className="col-md-4">
            <img 
              src={`${imageBaseUrl}${details.poster_path}`}
              alt={title}
              className="img-fluid rounded-3 shadow-lg show-poster"
            />
          </div>
          <div className="col-md-8 text-white">
            <h1 className="display-4 fw-bold mb-3">{title}</h1>
            <div className="d-flex align-items-center mb-3 flex-wrap">
              <span className="rating-badge me-3">⭐ {details.vote_average.toFixed(1)}</span>
              <span className="text-light opacity-75 me-3">{details.vote_count.toLocaleString()} votes</span>
              <span className="bullet-separator me-3">•</span>
              <span className="me-3">{getReleaseYear()}</span>
              <span className="bullet-separator me-3">•</span>
              <span className="status-badge">{details.status}</span>
            </div>
            <p className="lead mb-4">{details.overview}</p>
            <div className="genres-list">
              {details.genres.map(genre => (
                <span key={genre.id} className="genre-badge">{genre.name}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}