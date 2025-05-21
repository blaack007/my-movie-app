import React from 'react';

export default function ReleaseDateAndProduction({ details, imageBaseUrl }) {
  return (
    <>
      <div className="info-card mb-4">
        <div className="info-card-header">
          <i className="fas fa-calendar-alt info-icon"></i>
          <h4>Release Information</h4>
        </div>
        <div className="info-card-body">
          {details.release_date && (
            <div className="info-item">
              <span className="info-label">Release Date</span>
              <span className="info-value">{new Date(details.release_date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
            </div>
          )}
          {details.status && (
            <div className="info-item">
              <span className="info-label">Status</span>
              <span className="info-value">{details.status}</span>
            </div>
          )}
        </div>
      </div>

      {details.production_companies && details.production_companies.length > 0 && (
        <div className="info-card">
          <div className="info-card-header">
            <i className="fas fa-building info-icon"></i>
            <h4>Production Companies</h4>
          </div>
          <div className="info-card-body">
            <div className="production-companies-grid">
              {details.production_companies.map(company => (
                <div key={company.id} className="production-company">
                  <div className="production-company-image-wrapper">
                    {company.logo_path ? (
                      <img 
                        src={`${imageBaseUrl}${company.logo_path}`}
                        alt={company.name}
                        className="production-company-logo"
                      />
                    ) : (
                      <div className="production-company-placeholder">
                        <i className="fas fa-video"></i>
                      </div>
                    )}
                  </div>
                  <p className="company-name mt-2">{company.name}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
} 