import React from 'react';

export default function ShowInfo({ details }) {
  return (
    <section className="show-info-section">
      <div className="row g-4">
        <div className="col-md-6">
          <div className="info-card h-100">
            <div className="info-card-header">
              <i className="fas fa-film info-icon"></i>
              <h4>Seasons & Episodes</h4>
            </div>
            <div className="info-card-body">
              <div className="info-item"><span className="info-label">Seasons</span><span className="info-value">{details.number_of_seasons}</span></div>
              <div className="info-item"><span className="info-label">Episodes</span><span className="info-value">{details.number_of_episodes}</span></div>
              {details.episode_run_time?.length > 0 && (
                <div className="info-item"><span className="info-label">Episode Runtime</span><span className="info-value">{details.episode_run_time[0]} min</span></div>
              )}
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="info-card h-100">
            <div className="info-card-header">
              <i className="fas fa-info-circle info-icon"></i>
              <h4>Details</h4>
            </div>
            <div className="info-card-body">
              <div className="info-item"><span className="info-label">Type</span><span className="info-value">{details.type}</span></div>
              <div className="info-item"><span className="info-label">Original Language</span><span className="info-value">{details.original_language.toUpperCase()}</span></div>
              <div className="info-item"><span className="info-label">Popularity</span><span className="info-value">{details.popularity.toFixed(1)}</span></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}