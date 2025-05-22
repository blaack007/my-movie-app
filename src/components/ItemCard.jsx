import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ItemDetailsModal from './ItemDetailsModal';
import { IMAGE_BASE_URL } from '../apis/config';
import { isItemInWatchlist, addItemToWatchlist, removeItemFromWatchlist } from '../utils/watchlist';
import '../styles/components/Card.css';

const MAX_OVERVIEW_LENGTH = 100;

function truncateText(text, maxLength) {
  if (!text) return '';
  if (text.length <= maxLength) {
    return text;
  }
  return text.substring(0, maxLength).trim() + '...';
}

export default function ItemCard({ item, mediaType }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isInWatchlist, setIsInWatchlist] = useState(false);
  const itemImageBaseUrl = `${IMAGE_BASE_URL}w500`;

  useEffect(() => {
    setIsInWatchlist(isItemInWatchlist(item.id, mediaType));
  }, [item.id, mediaType]);

  if (!item || !item.poster_path) {
    return null; 
  }

  const isMovie = mediaType === 'movie';
  const title = isMovie ? item.title : (item.name || item.title);
  const detailPath = `/${mediaType}/${item.id}`;
  const truncatedOverview = truncateText(item.overview, MAX_OVERVIEW_LENGTH);

  const handleToggleWatchlist = (e) => {
    e.stopPropagation();
    
    if (isInWatchlist) {
      removeItemFromWatchlist(item.id, mediaType);
      setIsInWatchlist(false);
    } else {
      addItemToWatchlist(item, mediaType);
      setIsInWatchlist(true);
    }
  };

  return (
    <>
      <div className="app-card">
        <div 
          className="app-card__image-container position-relative"
          onClick={() => setIsModalOpen(true)}
          style={{ cursor: 'pointer' }}
        >
          <img
            src={`${itemImageBaseUrl}${item.poster_path}`}
            className="app-card__image"
            alt={title}
            loading="lazy"
          />
          <div className="app-card__image-overlay"></div>
          <div className="app-card__eye-icon">
            <i className="fas fa-eye"></i>
          </div>
          {item.vote_average > 0 && (
            <div className="app-card__rating">
              ⭐ {item.vote_average.toFixed(1)}
            </div>
          )}
          <button 
            className={`btn app-card__watchlist-btn ${isInWatchlist ? 'active' : ''}`}
            onClick={handleToggleWatchlist}
            title={isInWatchlist ? 'Remove from Watchlist' : 'Add to Watchlist'}
          >
            <i className={`fas ${isInWatchlist ? 'fa-bookmark' : 'fa-plus'}`}></i>
          </button>
        </div>
        <div className="app-card__body">
          <h5 className="app-card__title">{title}</h5>
          <p className="app-card__overview">{truncatedOverview}</p>
          <Link 
            to={detailPath}
            className="app-card__link"
            onClick={(e) => e.stopPropagation()}
          >
            More Details
          </Link>
        </div>
      </div>

      {isModalOpen && (
        <ItemDetailsModal 
          initialItem={item}
          mediaType={mediaType}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
} 