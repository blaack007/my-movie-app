import React from 'react';

export default function CastList({ cast, imageBaseUrl }) {
  if (cast.length === 0) return null;

  return (
    <section className="cast-section mb-5">
      <h4 className="mb-4">Featured Cast</h4>
      <div className="cast-grid">
        {cast.slice(0, 12).map(person => (
          <div key={person.id} className="cast-card">
            <div className="cast-card-image-wrapper">
              <img 
                src={person.profile_path ? `${imageBaseUrl}${person.profile_path}` : 'https://via.placeholder.com/300x450?text=No+Image'}
                alt={person.name}
                loading="lazy"
              />
              <div className="cast-card-overlay">
                <h5 className="cast-name">{person.name}</h5>
                <p className="cast-character">{person.character}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}