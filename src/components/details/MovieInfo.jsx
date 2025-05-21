import React from 'react';

export default function MovieInfo({ details }) {
  return (
    <section className="movie-info-section">
      <div className="row g-4">
        <div className="col-md-6">
          <div className="info-card h-100">
            <div className="info-card-header">
              <i className="fas fa-clock info-icon"></i>
              <h4>Runtime & Release</h4>
            </div>
            <div className="info-card-body">
              {details.runtime && (
                <div className="info-item"><span className="info-label">Runtime</span><span className="info-value">{details.runtime} min</span></div>
              )}
              {details.release_date && (
                <div className="info-item"><span className="info-label">Release Date</span><span className="info-value">{new Date(details.release_date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span></div>
              )}
              {details.budget > 0 && (
                 <div className="info-item"><span className="info-label">Budget</span><span className="info-value">${details.budget.toLocaleString()}</span></div>
              )}
              {details.revenue > 0 && (
                <div className="info-item"><span className="info-label">Revenue</span><span className="info-value">${details.revenue.toLocaleString()}</span></div>
              )}
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="info-card h-100">
            <div className="info-card-header">
              <i className="fas fa-film info-icon"></i>
              <h4>Details</h4>
            </div>
            <div className="info-card-body">
              {details.tagline && (
                <div className="info-item"><span className="info-label">Tagline</span><span className="info-value">{details.tagline}</span></div>
              )}
              <div className="info-item"><span className="info-label">Original Language</span><span className="info-value">{details.original_language.toUpperCase()}</span></div>
              <div className="info-item"><span className="info-label">Popularity</span><span className="info-value">{details.popularity.toFixed(1)}</span></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 