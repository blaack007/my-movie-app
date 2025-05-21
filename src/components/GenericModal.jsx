import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import '../styles/components/Modal.css'; // Assuming this style can be shared
import '../styles/components/Card.css'; // Added to access app-card__link styles

export default function GenericModal({ item, isOpen, onClose, mediaType, isLoadingDetails, detailsError }) {
  if (!isOpen || !item) return null;

  const imageBaseUrl = "https://image.tmdb.org/t/p/w500";
  const isMovie = mediaType === 'movie';

  // Common properties from item (which is initialItem or merged initialItem + details)
  const title = isMovie ? item.title : item.name;
  const overview = item.overview;
  const posterPath = item.poster_path;
  const voteAverage = item.vote_average;
  const voteCount = item.vote_count;
  const originalLanguage = item.original_language;
  const id = item.id;

  // Media type specific properties (may or may not be present in initialItem)
  const releaseDate = isMovie ? item.release_date : item.first_air_date;
  const status = !isMovie ? item.status : undefined;
  const numberOfSeasons = !isMovie ? item.number_of_seasons : undefined;
  const numberOfEpisodes = !isMovie ? item.number_of_episodes : undefined;
  const tagline = isMovie ? item.tagline : undefined;
  const budget = isMovie ? item.budget : undefined;
  const revenue = isMovie ? item.revenue : undefined;
  const runtime = isMovie ? item.runtime : undefined;
  const genres = item.genres || [];

  return (
    <Modal show={isOpen} onHide={onClose} centered size="lg" className="app-modal" scrollable>
      <Modal.Header closeButton className="app-modal__header">
        <Modal.Title className="app-modal__title">{title || "Loading..."}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="app-modal__body">
        <div className="row">
          {/* --- Left Column: Poster and essential details --- */}
          <div className="col-md-4 text-center">
            {posterPath ? (
              <img 
                src={`${imageBaseUrl}${posterPath}`}
                alt={title}
                className="img-fluid rounded app-modal__image mb-3"
              />
            ) : (
              <div className="app-modal__image-placeholder mb-3">No Image Available</div>
            )}
            {voteAverage > 0 && (
              <p className="mb-1"><strong>Rating:</strong> ⭐ {voteAverage?.toFixed(1)} ({voteCount || 0} votes)</p>
            )}
            {releaseDate && (
              <p className="mb-1"><strong>{isMovie ? "Released" : "First Aired"}:</strong> {new Date(releaseDate).toLocaleDateString()}</p>
            )}
            {!isMovie && status && (
                <p className="mb-1"><strong>Status:</strong> {status}</p>
            )}
          </div>

          {/* --- Right Column: Overview and other details --- */}
          <div className="col-md-8">
            <h6 className="fw-bold">Overview</h6>
            <p className="app-modal__overview mb-3">{overview || "Overview not available."}</p>

            {/* Indicator for loading additional details or error message */}
            {isLoadingDetails && (
              <div className="text-muted py-2">
                <div className="spinner-border spinner-border-sm me-2" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
                <span>Loading more details...</span>
              </div>
            )}
            {detailsError && !isLoadingDetails && (
              <div className="alert alert-warning py-2 mt-2 small">
                Could not load all details: {detailsError.message}
              </div>
            )}

            {/* Sections for details that are typically fetched (will appear when loaded) */}
            {!isLoadingDetails && !detailsError && (
              <>
                {isMovie && tagline && (
                  <p className="fst-italic text-warning mt-3">{tagline}</p>
                )}
                
                {isMovie && (runtime || budget > 0 || revenue > 0) && (
                  <>
                    <h6 className="fw-bold mt-3">Movie Info</h6>
                    {runtime && <p className="mb-1"><strong>Runtime:</strong> {runtime} minutes</p>}
                    {budget > 0 && <p className="mb-1"><strong>Budget:</strong> ${budget.toLocaleString()}</p>}
                    {revenue > 0 && <p className="mb-1"><strong>Revenue:</strong> ${revenue.toLocaleString()}</p>}
                  </>
                )}

                {!isMovie && (numberOfSeasons || numberOfEpisodes) && (
                  <>
                    <h6 className="fw-bold mt-3">Series Info</h6>
                    {numberOfSeasons && <p className="mb-1"><strong>Seasons:</strong> {numberOfSeasons}</p>}
                    {numberOfEpisodes && <p className="mb-1"><strong>Episodes:</strong> {numberOfEpisodes}</p>}
                  </>
                )}
              </>
            )}

            {/* Genres and Original Language (might be in initial item, or enhanced by details) */}
            {genres.length > 0 && (
                <>
                    <h6 className="fw-bold mt-3">Genres</h6>
                    <div>
                        {genres.map(genre => (
                            <span key={genre.id} className="badge bg-secondary me-1 mb-1">{genre.name}</span>
                        ))}
                    </div>
                </>
            )}
            {originalLanguage && (
              <p className="mt-3 mb-0"><strong>Original Language:</strong> {originalLanguage?.toUpperCase()}</p>
            )}
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer className="app-modal__footer">
        <Button variant="secondary" onClick={onClose} className="app-modal__button--close">
          Close
        </Button>
        <Link to={`/${mediaType}/${id}`} className="app-card__link app-modal__button--details" onClick={onClose}>
          View Full Page
        </Link>
      </Modal.Footer>
    </Modal>
  );
} 